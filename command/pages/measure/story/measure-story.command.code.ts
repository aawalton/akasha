import { windowOf } from "akasha/check/modules/measuring/check-measuring.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { runWindow } from "akasha/command/argument/pages/run-window.argument.ts"
import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { measureStory as page } from "akasha/command/pages/measure/story/measure-story.command.ts"
import {
  chosenOf,
  linesOf,
  phaseRowsIn,
} from "akasha/story/engine/modules/phase-timing/phase-timing.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const STORIES: readonly string[] = [storyPlayed.slug, storyWritten.slug]

export function measureStory(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [runWindow])
  if ("refused" in read) return mistaking(read.refused)
  const chose = windowOf(read.taken.runWindow)
  if (chose.chosen === null) return mistaking(chose.refusals)
  const rows = chosenOf(phaseRowsIn(given.root, STORIES), Date.now(), chose.chosen)
  return told([...linesOf(rows)])
}
