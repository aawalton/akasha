import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { keptRecord } from "akasha/command/argument/pages/kept-record.argument.ts"
import { playedTurn } from "akasha/command/argument/pages/played-turn.argument.ts"
import {
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { saidOf } from "akasha/command/modules/change-acting/change-acting.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { storyTurnKeptDrop as page } from "akasha/command/pages/story/turn/kept/drop/story-turn-kept-drop.command.ts"
import {
  droppedBeside,
  turnAtOf,
} from "akasha/command/pages/story/turn/modules/turn-keeping/turn-keeping.module.code.ts"
import { counted } from "akasha/text/writing/modules/counted/counted.module.code.ts"

const NAMED = [playedTurn, keptRecord] as const

export function storyTurnKeptDrop(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const named = read.taken.playedTurn.trim()
  const turn = turnAtOf(given.root, named)
  if (turn === null) return refused(`\`${named}\` names no played turn here`, DATA)
  const at = read.taken.keptRecord
  const gone = droppedBeside(given.root, turn, at)
  if ("refused" in gone) return refused(gone.refused, DATA)
  return told([
    `${String(at)}. ${saidOf(gone.went)}`,
    "this kept edit is gone, and nothing of it landed",
    `${counted(gone.left, "edit")} still kept beside \`${turn}\``,
  ])
}
