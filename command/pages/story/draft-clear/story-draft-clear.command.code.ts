import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { story as storyArgument } from "akasha/command/argument/pages/story.argument.ts"
import {
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { storyDraftClear as page } from "akasha/command/pages/story/draft-clear/story-draft-clear.command.ts"
import { draftedBeside } from "akasha/command/pages/story/turn/take-back/story-turn-take-back.command.code.ts"
import { bareOf } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const NAMED = [storyArgument] as const

export type Clearing = (root: string, game: string, action: string | null) => string | null

export function storyDraftClear(
  argv: readonly string[],
  given: Given,
  clear: Clearing = draftedBeside
): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const game = bareOf(read.taken.story.trim())
  const why = clear(given.root, game, null)
  if (why !== null) return refused(why, DATA)
  return told([`emptied\t${game}\tthe action bar`])
}
