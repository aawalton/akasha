export const PENDING_SIZE = 13

export interface PendingEntry {
  readonly path: string
  readonly entriesPerRun: number | null
  readonly unmeasured?: string
}

export type ExceptionMap = Readonly<Record<string, never>>

export interface TmpfsScratchConfig {
  readonly pending: readonly PendingEntry[]
  readonly exceptions: ExceptionMap
}

export interface CoverageInput {
  readonly detected: readonly string[]
  readonly config: TmpfsScratchConfig
  readonly declaredSize: number
  readonly fileExists: (relPath: string) => boolean
}

export type ViolationKind = "unclassified" | "size-mismatch" | "misordered" | "unstated-cost"

export interface CoverageViolation {
  readonly kind: ViolationKind
  readonly message: string
  readonly file?: string
}

export type ResolvedKind = "file-gone" | "burned-down"

export interface ResolvedEntry {
  readonly kind: ResolvedKind
  readonly file: string
}

export interface CoverageTally {
  readonly detected: number
  readonly pending: number
  readonly exceptions: number
  readonly unclassified: number
  readonly ratchet: number
}

export interface CoverageResult {
  readonly violations: readonly CoverageViolation[]
  readonly resolved: readonly ResolvedEntry[]
  readonly tally: CoverageTally
}

const REMEDY =
  "Create the tree under `/var/tmp` instead: it is disk-backed, carries no inode ceiling, " +
  "and is swept at 30 days. `/tmp` is tmpfs here, so a tree written there is spent out of the " +
  "same MemAvailable that decides whether the next agent can spawn."

const TEARDOWN =
  'Removal is a separate obligation and a `process.on("exit")` sweep does not discharge it: ' +
  "`bun test` exits without running exit handlers, so such a sweep reclaims nothing. Wire " +
  "teardown to a registry that removes the paths it recorded creating."

const NOT_A_PARKING_SPOT =
  "Do NOT add this file to the ratchet — it only ever shrinks, and it is a record of what " +
  "predates the check rather than a queue for what comes after it."

const rank = (entry: PendingEntry): number => entry.entriesPerRun ?? -1

function firstMisordered(entries: readonly PendingEntry[]): PendingEntry | undefined {
  let previous: PendingEntry | undefined
  for (const entry of entries) {
    if (previous !== undefined && rank(previous) < rank(entry)) return entry
    previous = entry
  }
  return undefined
}

export function reconcileTmpfsScratch(input: CoverageInput): CoverageResult {
  const { detected, config, declaredSize, fileExists } = input
  const violations: CoverageViolation[] = []
  const resolved: ResolvedEntry[] = []

  const pendingPaths = new Set(config.pending.map((e) => e.path))
  const exceptionPaths = new Set(Object.keys(config.exceptions))
  const detectedSet = new Set(detected)

  const counts = { pending: 0, exceptions: 0, unclassified: 0 }
  for (const file of detected) {
    if (pendingPaths.has(file)) {
      counts.pending++
      continue
    }
    if (exceptionPaths.has(file)) {
      counts.exceptions++
      continue
    }
    counts.unclassified++
    violations.push({
      kind: "unclassified",
      file,
      message: `creates scratch under /tmp, which is tmpfs. ${REMEDY} ${TEARDOWN} ${NOT_A_PARKING_SPOT}`,
    })
  }

  for (const entry of config.pending) {
    if (!fileExists(entry.path)) {
      resolved.push({ kind: "file-gone", file: entry.path })
      continue
    }
    if (!detectedSet.has(entry.path)) resolved.push({ kind: "burned-down", file: entry.path })
  }

  for (const entry of config.pending) {
    const stated = entry.unmeasured !== undefined && entry.unmeasured.trim() !== ""
    if (entry.entriesPerRun === null && !stated) {
      violations.push({
        kind: "unstated-cost",
        file: entry.path,
        message:
          "carries neither a measured entries-per-run nor an `unmeasured` statement. Measure it " +
          "by pointing TMPDIR at an empty directory, taking the run that reaches this site — its " +
          "own suite, the suites that drive it where it is a fixture, or the check itself where " +
          "it is a check — and counting what survives; prove the site fired by pointing TMPDIR at " +
          "a path that does not exist and watching the run break. Where no such run can be taken " +
          "here, say in `unmeasured` which run would give the number and what stopped this one. A " +
          "bare null reads as nobody having got round to it, which is the reading that stops " +
          "anybody looking again.",
      })
      continue
    }
    if (entry.entriesPerRun !== null && stated) {
      violations.push({
        kind: "unstated-cost",
        file: entry.path,
        message:
          "carries both a measured entries-per-run and an `unmeasured` statement. The statement " +
          "is what stands in place of a number, so beside one it is a second and unfalsifiable " +
          "account of a fact already measured. Drop whichever of the two is no longer true.",
      })
    }
  }

  if (config.pending.length !== declaredSize) {
    const grew = config.pending.length > declaredSize
    violations.push({
      kind: "size-mismatch",
      message:
        `the ratchet holds ${config.pending.length} entries but the declared size is ${declaredSize}, ` +
        `so the list ${grew ? "GREW without the constant" : "SHRANK without the constant"}. ` +
        (grew
          ? "Nothing may be parked here: this list records what predates the check, so the act " +
            "that settles a grow is to drop the entry you added and repair the file instead — " +
            `route its scratch under /var/tmp and leave PENDING_SIZE at ${declaredSize}. If the ` +
            "entry is not yours, a sibling parked it and the same act applies to theirs."
          : "The act that settles a shrink is to lower PENDING_SIZE to " +
            `${config.pending.length} in the same commit that dropped the entry. If you dropped ` +
            "nothing, a sibling burned a site down and left the constant behind; lowering it is " +
            "still the whole repair.") +
        " The two are held equal in both directions on purpose: a ceiling would absorb a new " +
        "violation under leftover headroom, which is the failure this check exists to prevent.",
    })
  }

  const outOfOrder = firstMisordered(config.pending)
  if (outOfOrder !== undefined) {
    violations.push({
      kind: "misordered",
      file: outOfOrder.path,
      message:
        "the ratchet is not ordered by measured entries-per-run, descending, with unmeasured " +
        "entries last. The order is what makes the burn-down reclaim inodes early: these files " +
        "differ by more than two orders of magnitude per run, so a list ordered any other way " +
        "spends its first passes on the cheapest ones.",
    })
  }

  return {
    violations,
    resolved,
    tally: {
      detected: detected.length,
      ...counts,
      ratchet: config.pending.length,
    },
  }
}
