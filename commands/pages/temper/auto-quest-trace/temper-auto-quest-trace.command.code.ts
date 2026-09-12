import { readFileSync } from "node:fs"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { questTracePath } from "akasha/commands/arguments/pages/quest-trace-path.argument.ts"
import {
  asJson,
  DATA,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperAutoQuestTrace as page } from "akasha/commands/pages/temper/auto-quest-trace/temper-auto-quest-trace.command.ts"
import { saidShort } from "akasha/temper/commands/flag-fault-stage/flag-fault-stage.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { TEMPER_QUESTS_SAVED_VARIABLES } from "akasha/temper/quests-trace/modules/auto-quest-trace/auto-quest-trace.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/saved-variables/lua-parser/lua-parser.module.code.ts"

const NAMED = [json, questTracePath]

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

export function temperAutoQuestTrace(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const tracePath = taken.questTracePath ?? savedVarsFile(CAPTURE_FILE)

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

  if (taken.json) {
    return asJson(entries)
  }

  return told(entries.flatMap(linesOf))
}
