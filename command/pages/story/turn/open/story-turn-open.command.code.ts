import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { story } from "akasha/command/argument/pages/story.argument.ts"
import {
  DATA,
  faulted,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { storyTurnOpen as page } from "akasha/command/pages/story/turn/open/story-turn-open.command.ts"
import {
  type Calls,
  openingMadeFor,
} from "akasha/story/world/stories/played/turns/modules/turn-making/turn-making.module.code.ts"

const OPENER = "story opening <story-opening@alanwalton.com>"

export async function storyTurnOpen(
  argv: readonly string[],
  given: Given,
  calls?: Calls
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [story])
  if ("refused" in read) return refusedBy(read.refused)
  const game = read.taken.story.trim()
  if (game === "") return refusedBy([`\`${story.said}\` names no story`])
  try {
    const made = await openingMadeFor(game, given.writer ?? OPENER, calls)
    if (made.kind === "refused") return refusedBy([made.said], DATA)
    if (made.kind === "unread") return refusedBy([made.why], OPERATIONAL)
    return told([`opened\t${made.slug}\t${made.at}`])
  } catch (thrown) {
    return faulted(thrown)
  }
}
