import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import {
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { storyTurnAdvance } from "akasha/command/pages/story/turn/advance/story-turn-advance.command.ts"
import { readyBeatOf } from "akasha/command/pages/story/turn/modules/turn-beat-handing/turn-beat-handing.module.code.ts"
import {
  REACHED,
  type Seated,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { storyTurnNext as page } from "akasha/command/pages/story/turn/next/story-turn-next.command.ts"

const NAMED = [] as const

const LAST_WORD = /\S+$/

export function nothingSaid(seat: string): string {
  return `no beat is ready for \`${seat}\`, so end your turn: the next beat ready for it comes as a message`
}

export function storyTurnNext(
  argv: readonly string[],
  given: Given,
  seatOf: (root: string, agentId: string | null) => Seated | null = REACHED.seatOf
): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const seat = seatOf(given.root, given.agentId)
  if (seat === null || seat.role === null || seat.game === null) {
    return refused("the caller holds no role in a story, so no beat is ready for it", DATA)
  }
  const advancing = given.calledAs.replace(LAST_WORD, storyTurnAdvance.name)
  const held = { name: seat.name, role: seat.role, game: seat.game }
  return told([readyBeatOf(given.root, held, advancing) ?? nothingSaid(seat.name)])
}
