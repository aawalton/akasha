#!/usr/bin/env bun

import { type Drawn, type DrawnRow, drawn } from "../panel-reading/panel-reading.module.code.ts"

const HELP = `bun editor-extension/panel-judging/panel-judging.module.code.ts

Refuses a panel that draws nothing. What each surface is asked for, and what is pinned rather
than counted, is stated on the module page beside this file.

  --json      print the whole reading rather than the judgement
  --raw <at>  also write the reading to a file
  --help      This.
`

const A_NUMBER = /^\d+%$/

const NOT_A_GLYPH = /[︎️‍]/g

const PINNED_GROUPS: readonly {
  readonly id: string
  readonly said: string
  readonly count: number
}[] = [
  { id: "opsStatusBar.upkeepStoplights", said: "upkeep", count: 6 },
  { id: "opsStatusBar.inboxStoplights", said: "inboxes", count: 3 },
]

const USAGE_SLOTS: readonly { readonly id: string; readonly said: string }[] = [
  { id: "opsStatusBar.usage.session", said: "session usage" },
  { id: "opsStatusBar.usage.weekly", said: "weekly usage" },
]

const FEATURE_TIMING =
  /^\[([a-z-]+)\] (?:activated in (\d+)ms|FAILED after (\d+)ms|has not finished after (\d+)ms)/

const FILLED_BY: Readonly<Record<string, string>> = {
  opsAgentTree: "agent-tree",
  opsDomainTree: "domain-tree",
  opsWorkTree: "work-tree",
  opsPageTree: "page-tree",
  statusBar: "status-bar",
}

const READ_COUNT = /\] (\d+) running, (\d+) rows, (\d+) roots/

export interface FeatureTiming {
  readonly feature: string
  readonly ms: number
  readonly state: "activated" | "failed" | "abandoned"
}

export function featureTimings(lines: readonly string[]): readonly FeatureTiming[] {
  const timings: FeatureTiming[] = []
  for (const line of lines) {
    const hit = FEATURE_TIMING.exec(line)
    if (hit === null) continue
    const feature = hit[1] as string
    if (hit[2] !== undefined) timings.push({ feature, ms: Number(hit[2]), state: "activated" })
    else if (hit[3] !== undefined) timings.push({ feature, ms: Number(hit[3]), state: "failed" })
    else if (hit[4] !== undefined) timings.push({ feature, ms: Number(hit[4]), state: "abandoned" })
  }
  return timings
}

export function readsLogged(lines: readonly string[]): readonly number[] {
  const counted: number[] = []
  for (const line of lines) {
    const hit = READ_COUNT.exec(line)
    if (hit !== null) counted.push(Number(hit[2]))
  }
  return counted
}

export interface Verdict {
  readonly surface: string
  readonly green: boolean
  readonly said: string
  readonly notes: readonly string[]
}

export function everyRow(rows: readonly DrawnRow[]): readonly DrawnRow[] {
  return rows.flatMap((row) => [row, ...everyRow(row.children)])
}

export function glyphCount(text: string): number {
  return [...text.replace(NOT_A_GLYPH, "")].length
}

export function firstLine(said: string): string {
  const one = said.split("\n").find((line) => line.trim() !== "")
  return one === undefined ? said : one.trim()
}

function blankLabels(rows: readonly DrawnRow[]): readonly DrawnRow[] {
  return rows.filter((row) => row.label === null || row.label.trim() === "")
}

function idless(rows: readonly DrawnRow[]): readonly DrawnRow[] {
  return rows.filter((row) => row.id === null || row.id === "")
}

function threw(rows: readonly DrawnRow[]): readonly DrawnRow[] {
  return rows.filter((row) => row.drewNothing !== null)
}

export interface TreeExpectation {
  readonly viewId: string
  readonly said: string
  readonly carries: "a turn colour" | "a document to open"
  readonly atLeast: number | null
}

const TREES: readonly TreeExpectation[] = [
  { viewId: "opsAgentTree", said: "Agents", carries: "a turn colour", atLeast: null },
  { viewId: "opsDomainTree", said: "Domains", carries: "a document to open", atLeast: 500 },
  { viewId: "opsWorkTree", said: "Work", carries: "a turn colour", atLeast: null },
  { viewId: "opsPageTree", said: "Pages", carries: "a document to open", atLeast: 500 },
]

export function carried(rows: readonly DrawnRow[], carries: TreeExpectation["carries"]): number {
  if (carries === "a turn colour") {
    return rows.filter((row) => row.resourceUri !== null && row.resourceUri !== "").length
  }
  return rows.filter((row) => row.hasCommand).length
}

export function judgeTree(reading: Drawn, want: TreeExpectation): Verdict {
  const panel = reading.panels[want.viewId]
  const nothing: readonly string[] = []
  if (panel === undefined) {
    return {
      surface: want.viewId,
      green: false,
      said: `${want.said} registered no view at all, so the panel the editor shows is not this extension's`,
      notes: nothing,
    }
  }
  if (panel.failure !== null) {
    return {
      surface: want.viewId,
      green: false,
      said: `${want.said} could not be read: ${firstLine(panel.failure)}`,
      notes: nothing,
    }
  }
  const all = everyRow(panel.roots)
  if (all.length === 0) {
    return {
      surface: want.viewId,
      green: false,
      said: `${want.said} drew no row at all — the panel is empty`,
      notes: nothing,
    }
  }
  const blank = blankLabels(all)
  const noId = idless(all)
  const broke = threw(all)
  const holds = carried(all, want.carries)
  const notes = [
    `${String(panel.roots.length)} roots, ${String(all.length)} rows, ${String(holds)} carrying ${want.carries}`,
  ]
  const red = (said: string): Verdict => ({ surface: want.viewId, green: false, said, notes })
  if (broke.length > 0) {
    return red(
      `${want.said} threw drawing ${String(broke.length)} of ${String(all.length)} rows: ${firstLine(broke[0]?.drewNothing ?? "")}`
    )
  }
  if (blank.length > 0) {
    return red(
      `${want.said} drew ${String(blank.length)} of ${String(all.length)} rows with no label, and a row with none is a blank line`
    )
  }
  if (noId.length > 0) {
    return red(
      `${want.said} drew ${String(noId.length)} of ${String(all.length)} rows with no id, and the editor collapses rows that share one`
    )
  }
  if (holds === 0) {
    return red(`${want.said} drew ${String(all.length)} rows and not one carries ${want.carries}`)
  }
  if (want.atLeast !== null && all.length < want.atLeast) {
    return red(
      `${want.said} drew ${String(all.length)} rows, under the ${String(want.atLeast)} a tree ` +
        "read from the corpus draws — the rows it did draw are well formed, so what is lost here " +
        "is lost quietly and only the count says so"
    )
  }
  return {
    surface: want.viewId,
    green: true,
    said: `${want.said} drew ${String(all.length)} rows`,
    notes,
  }
}

export function judgeStatusBar(reading: Drawn): Verdict {
  const items = reading.statusBar
  if (items.length === 0) {
    return {
      surface: "statusBar",
      green: false,
      said: "the status bar created no item at all",
      notes: [],
    }
  }
  const byId = new Map(items.map((one) => [one.id, one]))
  const notes: string[] = [
    `${String(items.length)} items: ${items.map((one) => `${one.id}=${one.text ?? "null"}`).join(" ")}`,
  ]
  const wrong: string[] = []
  for (const slot of USAGE_SLOTS) {
    const item = byId.get(slot.id)
    if (item === undefined) {
      wrong.push(`no ${slot.said} slot was created`)
      continue
    }
    if (item.text === null || !A_NUMBER.test(item.text)) {
      wrong.push(`${slot.said} reads \`${item.text ?? "null"}\` rather than a number`)
    }
  }
  for (const group of PINNED_GROUPS) {
    const item = byId.get(group.id)
    if (item === undefined) {
      wrong.push(`no ${group.said} group was created`)
      continue
    }
    const shown = glyphCount(item.text ?? "")
    if (shown !== group.count) {
      wrong.push(
        `the ${group.said} group shows ${String(shown)} stoplights and the invariant pins ${String(group.count)}` +
          ` (it reads \`${item.text ?? "null"}\`)`
      )
    }
  }
  const hidden = items.filter((one) => !one.shown)
  if (hidden.length > 0) {
    wrong.push(`${String(hidden.length)} items were created and never shown`)
  }
  if (wrong.length > 0) {
    return {
      surface: "statusBar",
      green: false,
      said: `the status bar — ${wrong.join("; ")}`,
      notes,
    }
  }
  return {
    surface: "statusBar",
    green: true,
    said: `the status bar drew ${String(items.length)} slots, both usage numbers and 6/3 stoplights`,
    notes,
  }
}

export function verdictsOf(reading: Drawn): readonly Verdict[] {
  return [...TREES.map((one) => judgeTree(reading, one)), judgeStatusBar(reading)]
}

export function activationLines(reading: Drawn): readonly string[] {
  return reading.channels["Ops: Activation"] ?? []
}

export function timingReport(reading: Drawn): readonly string[] {
  const timings = featureTimings(activationLines(reading))
  const byFeature = new Map(timings.map((one) => [one.feature, one]))
  const said: string[] = []
  const total = reading.activateMs
  said.push(
    `activation ${total === undefined ? "?" : String(total)}ms wall` +
      `, the panel walk ${reading.reportMs === undefined ? "?" : String(reading.reportMs)}ms` +
      ` — features start together, so the wall is the slowest of them, not their sum`
  )
  for (const one of [...timings].sort((a, b) => b.ms - a.ms)) {
    const surface = Object.entries(FILLED_BY).find(([, feature]) => feature === one.feature)?.[0]
    said.push(
      `  ${one.feature.padEnd(16)} ${String(one.ms).padStart(6)}ms` +
        (one.state === "activated" ? "" : `  ${one.state.toUpperCase()}`) +
        (surface === undefined ? "" : `  (${surface})`)
    )
  }
  for (const [surface, feature] of Object.entries(FILLED_BY)) {
    if (!byFeature.has(feature)) {
      said.push(
        `  ${feature.padEnd(16)}      ?ms  the activation channel timed no start for it (${surface})`
      )
    }
  }
  const agentLines = reading.channels["Ops: Agent Tree"] ?? []
  const reads = readsLogged(agentLines)
  const drew = everyRow(reading.panels["opsAgentTree"]?.roots ?? []).length
  if (reads.length > 0) {
    said.push(
      `  opsAgentTree read ${reads.join(", ")} rows across ${String(reads.length)} reads` +
        ` and drew ${String(drew)}`
    )
  }
  for (const line of agentLines) {
    if (line.includes("UNREAD")) said.push(`  opsAgentTree ${line.slice(line.indexOf("UNREAD"))}`)
  }
  return said
}

export async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return 0
  }
  let asJson = false
  let rawAt: string | null = null
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] === "--json") {
      asJson = true
      continue
    }
    if (argv[at] === "--raw") {
      const named = argv[at + 1]
      if (named === undefined) {
        process.stderr.write("error: --raw takes a path after it\n")
        return 1
      }
      rawAt = named
      at += 1
      continue
    }
    process.stderr.write(`error: this command takes no flag ${String(argv[at])}\n`)
    return 1
  }

  let reading: Drawn
  try {
    reading = await drawn(process.cwd(), rawAt)
  } catch (err) {
    process.stderr.write(`UNJUDGED — ${err instanceof Error ? err.message : String(err)}\n`)
    return 4
  }

  if (asJson) {
    process.stdout.write(`${JSON.stringify(reading, null, 2)}\n`)
    return 0
  }

  const verdicts = verdictsOf(reading)
  const red = verdicts.filter((one) => !one.green)

  if (reading.activateError !== null) {
    process.stdout.write(`REFUSED  activation threw: ${firstLine(reading.activateError)}\n`)
  }
  for (const verdict of verdicts) {
    process.stdout.write(
      `${verdict.green ? "drawn   " : "EMPTY   "} ${verdict.surface} — ${verdict.said}\n`
    )
    for (const note of verdict.notes) process.stdout.write(`         ${note}\n`)
  }
  process.stdout.write("timing  \n")
  for (const line of timingReport(reading)) process.stdout.write(`         ${line}\n`)
  if (red.length > 0) {
    for (const line of activationLines(reading)) {
      process.stdout.write(`  activation said: ${line}\n`)
    }
  }
  process.stdout.write(
    `${String(verdicts.length - red.length)} of ${String(verdicts.length)} surfaces draw content` +
      (red.length === 0 ? "\n" : `; ${red.map((one) => one.surface).join(", ")} do not\n`)
  )
  return red.length > 0 || reading.activateError !== null ? 2 : 0
}

if (import.meta.main) process.exitCode = await main(process.argv.slice(2))
