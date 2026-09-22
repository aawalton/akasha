import {
  rollupIntelligenceTopicsForDay,
  rollupWisdomWordsForDay,
} from "akasha/alan/track/daily/modules/topic-words/topic-words.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { day as dayArgument } from "akasha/command/argument/pages/day.argument.ts"
import {
  faulted,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { trackTopicWords as page } from "akasha/command/pages/track/topic-words/track-topic-words.command.ts"

export async function trackTopicWords(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [dayArgument])
  if ("refused" in read) return refusedBy(read.refused)
  const day = read.taken.day
  try {
    const words = await rollupWisdomWordsForDay(day)
    const topics = await rollupIntelligenceTopicsForDay(day)
    return told([
      `${day}  ${String(words.wisdomWords)} wisdom word(s) ${words.outcome}  ` +
        `${String(topics.intelligenceTopics)} intelligence topic(s) ${topics.outcome}`,
    ])
  } catch (thrown) {
    return faulted(thrown)
  }
}
