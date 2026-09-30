import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { story as storyArgument } from "akasha/command/argument/pages/story.argument.ts"
import {
  answeredWith,
  DATA,
  INPUT,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { storyChapterWrite as page } from "akasha/command/pages/story/chapter-write/story-chapter-write.command.ts"
import {
  type ChapterMade,
  chapterMadeFor,
} from "akasha/story/world/stories/written/chapters/modules/chapter-making/chapter-making.module.code.ts"

const NAMED = [storyArgument] as const

const PARTED = "/"

type Making = (story: string) => Promise<ChapterMade>

export async function storyChapterWrite(
  argv: readonly string[],
  given: Given,
  making: Making = chapterMadeFor
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const named = read.taken.story.trim()
  const story = named.slice(named.lastIndexOf(PARTED) + 1)
  if (story === "") return refused(`\`${storyArgument.said}\` names no story`, INPUT)
  const made = await making(story)
  if (made.kind === "refused") return refused(made.said, DATA)
  if (made.kind === "unread") return refused(made.why, OPERATIONAL)
  const report = [made.at, ...made.told.map((one) => `told\t${one}`)]
  if (made.faults.length === 0) return told(report)
  return answeredWith(report, [...made.faults], OPERATIONAL)
}
