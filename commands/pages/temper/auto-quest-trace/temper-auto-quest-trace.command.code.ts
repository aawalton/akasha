import { readFileSync } from "node:fs"
import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { savedVarsFile } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { TEMPER_QUESTS_SAVED_VARIABLES } from "akasha/temper/quests-trace/auto-quest-trace/auto-quest-trace.module.code.ts"
import {
  saidFor,
  saidShort,
} from "../../../../temper/temper-commands/flag-fault-stage/flag-fault-stage.module.code.ts"

const DATA = 2

const PATH_FLAG = "--path"

const JSON_FLAG = "--json"

const SAVED_VARIABLES_NAME = "TemperQuests_SavedVariables"

const CAPTURE_FILE = "TemperQuests.lua"

const NOTHING_CAPTURED =
  "holds no captured trace, so nothing here is an empty run rather than an unread one"

type TraceOption = {
  readonly index: number
  readonly optionType: number
  readonly optionTypeName?: string
  readonly kind: string
  readonly important: boolean
  readonly chosenBefore: boolean
  readonly text: string
}

type TraceEntry = {
  readonly kind: string
  readonly at: number
  readonly interactionType: number
  readonly interactionTypeName?: string
  readonly offerPending: boolean
  readonly pendingCompletion: boolean
  readonly decision: string
  readonly options: readonly TraceOption[]
  readonly action: string
  readonly journalIndex: number
  readonly numRewards: number
}

type AccountBlock = {
  readonly $AccountWide?: { readonly autoQuestDebugTrace?: readonly TraceEntry[] }
}

type CaptureRoot = { readonly Default?: Record<string, AccountBlock> }

function entriesIn(root: CaptureRoot): readonly TraceEntry[] {
  const accounts = root.Default
  if (accounts === undefined) return []
  const collected: TraceEntry[] = []
  for (const account of Object.values(accounts)) {
    for (const entry of account.$AccountWide?.autoQuestDebugTrace ?? []) collected.push(entry)
  }
  return collected
}

function namedType(type: number, name: string | undefined): string {
  return name === undefined ? String(type) : `${String(type)} (${name})`
}

function menuLines(entry: TraceEntry): readonly string[] {
  const head =
    `t=${String(entry.at)} menu int=${namedType(entry.interactionType, entry.interactionTypeName)}` +
    ` offer=${entry.offerPending ? "y" : "n"} pending=${entry.pendingCompletion ? "y" : "n"}` +
    ` decision="${entry.decision}"`
  return [
    head,
    ...entry.options.map((one) => {
      const flags = `${one.important ? " important" : ""}${one.chosenBefore ? " chosen-before" : ""}`
      return `    ${String(one.index)}: type=${namedType(one.optionType, one.optionTypeName)} kind=${one.kind}${flags} | ${one.text}`
    }),
  ]
}

function linesOf(entry: TraceEntry): readonly string[] {
  if (entry.kind === "menu") return menuLines(entry)
  if (entry.kind === "action") return [`t=${String(entry.at)} action ${entry.action}`]
  return [
    `t=${String(entry.at)} complete-dialog journalIndex=${String(entry.journalIndex)} numRewards=${String(entry.numRewards)}`,
  ]
}

export function temperAutoQuestTrace(argv: readonly string[] = []): Answer {
  const tracePath = saidFor(argv, PATH_FLAG) ?? savedVarsFile(CAPTURE_FILE)

  let content: string
  try {
    content = readFileSync(tracePath, "utf8")
  } catch (thrown) {
    return refused(
      `no capture is at ${tracePath}, so there is no trace to read: ${saidShort(thrown)}`,
      DATA
    )
  }

  let entries: readonly TraceEntry[]
  try {
    const raw = parseLuaSavedVariablesFile(content, SAVED_VARIABLES_NAME)
    entries = entriesIn(TEMPER_QUESTS_SAVED_VARIABLES.parse(raw) as CaptureRoot)
  } catch (thrown) {
    return refused(`${tracePath} holds no trace this reads: ${saidShort(thrown)}`, DATA)
  }

  if (entries.length === 0) return refused(`${tracePath} ${NOTHING_CAPTURED}`, DATA)

  if (argv.includes(JSON_FLAG)) {
    return { report: [JSON.stringify(entries)], refusals: [], code: 0 }
  }

  return { report: entries.flatMap(linesOf), refusals: [], code: 0 }
}
