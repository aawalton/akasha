export interface HealthSamplesStreamViolation {
  readonly rule: string
  readonly message: string
}

const OPEN = "cat >> \"$APPDELEGATE\" <<'SWIFT_HEALTH_SAMPLES'"
const CLOSE = "SWIFT_HEALTH_SAMPLES"

export function extractEmittedSwift(seamText: string): string | undefined {
  const lines = seamText.split("\n")
  const blocks: string[] = []
  let i = 0
  while (i < lines.length) {
    if (lines[i]?.trim() !== OPEN) {
      i += 1
      continue
    }
    const close = lines.findIndex((l, j) => j > i && l.trim() === CLOSE)
    if (close === -1) return undefined
    blocks.push(lines.slice(i + 1, close).join("\n"))
    i = close + 1
  }
  return blocks.length === 0 ? undefined : blocks.join("\n")
}

function codeLines(swift: string): readonly string[] {
  return swift
    .split("\n")
    .map((l) => {
      const at = l.indexOf("//")
      return at === -1 ? l : l.slice(0, at)
    })
    .filter((l) => l.trim().length > 0)
}

function emptyPageBranch(code: readonly string[]): readonly string[] | undefined {
  const start = code.findIndex((l) => l.trim() === "if samples.isEmpty {")
  const opener = start === -1 ? undefined : code[start]
  if (opener === undefined) return undefined
  const indent = opener.search(/\S/)
  for (let i = start + 1; i < code.length; i += 1) {
    const line = code[i]
    if (line === undefined) break
    if (line.trim() === "}" && line.search(/\S/) === indent) return code.slice(start + 1, i)
  }
  return undefined
}

function bodyEnd(code: readonly string[], header: number): number {
  const opener = code[header]
  const indent = opener === undefined ? 0 : opener.search(/\S/)
  for (let i = header + 1; i < code.length; i += 1) {
    const line = code[i]
    if (line === undefined) break
    if (line.search(/\S/) <= indent) return i
  }
  return code.length
}

export function findHealthSamplesStreamViolations(
  seamText: string
): readonly HealthSamplesStreamViolation[] {
  const swift = extractEmittedSwift(seamText)
  if (swift === undefined) {
    return [
      {
        rule: "block-present",
        message:
          "no SWIFT_HEALTH_SAMPLES heredoc in the seam script, so nothing here examined any Swift — a pass would have been a reading of nothing",
      },
    ]
  }

  const violations: HealthSamplesStreamViolation[] = []
  const code = codeLines(swift)
  const joined = code.join("\n")
  const has = (needle: string): boolean => joined.includes(needle)

  const branch = emptyPageBranch(code)
  if (branch === undefined) {
    violations.push({
      rule: "empty-page-branch",
      message:
        "the `if samples.isEmpty {` branch of the anchored drain is gone or reshaped, so the rule that it must not advance the anchor cannot be measured at all",
    })
  } else if (branch.some((l) => l.includes("writeAnchor"))) {
    violations.push({
      rule: "empty-page-anchor-write",
      message:
        "the empty-page branch calls writeAnchor — the exact defect that put three days of Alan's calories permanently behind the cursor on 2026-08-09. An empty page cannot be told from an unauthorized read, so it may never be acknowledged",
    })
  }

  const anchorWrites = code.flatMap((l, i) =>
    l.includes("writeAnchor(") && !l.includes("static func writeAnchor(") ? [i] : []
  )
  if (anchorWrites.length !== 1) {
    violations.push({
      rule: "single-anchor-write",
      message: `the anchor is written from ${String(anchorWrites.length)} place(s); exactly one is allowed, the success arm of the POST. Any other site advances a cursor past samples the server never acknowledged`,
    })
  }
  const successArms = code.flatMap((l, i) =>
    l.trim().startsWith("case .success(") ? [[i + 1, bodyEnd(code, i)] as const] : []
  )
  if (successArms.length === 0) {
    violations.push({
      rule: "post-success-arm",
      message:
        "no `case .success(` arm of the POST is left to find, so the rule that the anchor is written there and nowhere else cannot be measured at all",
    })
  } else if (anchorWrites.some((at) => !successArms.some(([from, to]) => at >= from && at < to))) {
    violations.push({
      rule: "anchor-write-off-success-arm",
      message:
        "the anchor is written from outside the `case .success(` arm of the POST. A write the failure arm can reach advances the cursor past exactly the batch the server refused, which is the loss that arm's own comment says cannot happen — and it is what makes `nothing from that point on is lost` untrue",
    })
  }

  if (
    has("defaults.set(seeded") ||
    /\.set\([^)]*,\s*forKey:\s*metric\.legacyFloorKey\)/.test(joined)
  ) {
    violations.push({
      rule: "persisted-floor",
      message:
        "a date floor is being written to UserDefaults. Seeded once and never recomputed it is an unreadable permanent lower bound on everything the metric can reach; the seed window belongs in a computed value applied only where there is no anchor",
    })
  }

  const predicateDecl = code.findIndex((l) => l.trim() === "let predicate: NSPredicate? =")
  if (predicateDecl === -1) {
    violations.push({
      rule: "seed-window-predicate-shape",
      message:
        "the anchored drain no longer declares `let predicate: NSPredicate? =` on a line of its own, so which condition chooses between a date window and no window cannot be measured at all",
    })
  } else {
    const wrapped = code.slice(predicateDecl + 1, bodyEnd(code, predicateDecl))
    const chosenOn = wrapped[0]?.trim() ?? ""
    const otherwise = wrapped.find((l) => l.trim().startsWith(":"))?.trim() ?? ""
    if (chosenOn !== "anchor == nil" || otherwise !== ": nil") {
      violations.push({
        rule: "seed-window-only-unanchored",
        message: `the anchored drain chooses its predicate on \`${chosenOn}\` falling back to \`${otherwise}\`, rather than on \`anchor == nil\` falling back to no predicate at all. A date window applied beside an anchor silently drops what a run after a long outage would have recovered`,
      })
    }
  }

  if (!has("static func sweep(") || !has("static func runWindowQuery(")) {
    violations.push({
      rule: "sweep-present",
      message:
        "the backstop read is gone. Without it the intent trusts a single cursor that has already been wrong once, and cannot part a quiet window from a read it is not allowed to make",
    })
  }
  if (!has("HKSampleQuery(")) {
    violations.push({
      rule: "sweep-is-cursorless",
      message:
        "the backstop no longer uses HKSampleQuery. Its whole value is carrying no cursor and no persisted state — a second anchored query would inherit the fault it exists to catch",
    })
  }
  const emptySend = code.findIndex((l) => l.trim() === "if sent == 0 {")
  if (
    emptySend === -1 ||
    !(code[emptySend + 1]?.trim().startsWith("return await sweep(") ?? false)
  ) {
    violations.push({
      rule: "sweep-is-reached",
      message:
        "sending nothing does not route straight into the backstop, so `nothing new to send` can once again be reported on the anchored read's word alone",
    })
  }

  if (!has("static func resetStateIfNeeded(") || !has("removeObject(forKey: metric.anchorKey)")) {
    violations.push({
      rule: "state-reset",
      message:
        "the one-shot state reset is gone. A phone already carrying a cursor advanced past unsent samples would install this build, pass every check, and still stream nothing",
    })
  }
  const indentOf = (i: number): number => code[i]?.search(/\S/) ?? -1
  const resetCall = code.findIndex(
    (l) => l.trim() === "StreamHealthSamplesIntent.resetStateIfNeeded()"
  )
  const metricLoop = code.findIndex((l) =>
    l.trim().startsWith("for (metric, quantityType) in resolved")
  )
  if (
    resetCall === -1 ||
    metricLoop === -1 ||
    resetCall > metricLoop ||
    indentOf(resetCall) !== indentOf(metricLoop)
  ) {
    violations.push({
      rule: "state-reset-runs-first",
      message:
        "the state reset is not an unconditional statement standing before the per-metric loop at the loop's own nesting. Wrapped in a condition it can stand textually first and still never run, and a run then queries against the very cursor the reset exists to drop",
    })
  }

  if (has("EsoLogicalDay")) {
    violations.push({
      rule: "no-day-rule",
      message:
        "a day rule has reached the sample stream. Every window judgment belongs server-side against stored rows; a day computed on the phone cannot be un-computed",
    })
  }

  return violations
}
