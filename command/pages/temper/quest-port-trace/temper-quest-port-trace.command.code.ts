import { readFileSync, statSync } from "node:fs"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { questTracePath } from "akasha/command/argument/pages/quest-trace-path.argument.ts"
import {
  asJson,
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperQuestPortTrace as page } from "akasha/command/pages/temper/quest-port-trace/temper-quest-port-trace.command.ts"
import {
  assistMoveLines,
  capturesIn,
  journalLines,
  pressLines,
  QUEST_PORT_SAVED_VARIABLES,
  type QuestPortCaptures,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-reading/quest-port-reading.module.code.ts"
import { saidShort } from "akasha/temper/command/modules/flag-fault-stage/flag-fault-stage.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso/path/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"

const NAMED = [json, questTracePath]

const SAVED_VARIABLES_NAME = "TemperQuests_SavedVariables"

const CAPTURE_FILE = "TemperWorld.lua"

const NOTHING_CAPTURED =
  "holds no open journal, no port press and no next-quest move, so the add-on has written none since it was built"

export function temperQuestPortTrace(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const capturePath = taken.questTracePath ?? savedVarsFile(CAPTURE_FILE)

  let content: string
  let writtenAt: string
  try {
    content = readFileSync(capturePath, "utf8")
    writtenAt = statSync(capturePath).mtime.toISOString()
  } catch (thrown) {
    return refused(
      `no capture is at ${capturePath}, so there is nothing to read: ${saidShort(thrown)}`,
      DATA
    )
  }

  let captures: QuestPortCaptures
  try {
    const raw = parseLuaSavedVariablesFile(content, SAVED_VARIABLES_NAME)
    captures = capturesIn(QUEST_PORT_SAVED_VARIABLES.parse(raw))
  } catch (thrown) {
    return refused(`${capturePath} holds no capture this reads: ${saidShort(thrown)}`, DATA)
  }

  const { journals, presses, assistMoves } = captures
  if (journals.length + presses.length + assistMoves.length === 0) {
    return refused(`${capturePath} ${NOTHING_CAPTURED}`, DATA)
  }

  if (taken.json) return asJson({ capturePath, writtenAt, journals, presses, assistMoves })

  return told([
    `${capturePath} was last written ${writtenAt}; the game writes it only on /reloadui or logout`,
    "",
    ...journals.flatMap(journalLines),
    "",
    `port presses (${String(presses.length)}, oldest first):`,
    ...presses.flatMap(pressLines),
    "",
    `next-quest moves (${String(assistMoves.length)}, oldest first):`,
    ...assistMoves.flatMap(assistMoveLines),
  ])
}
