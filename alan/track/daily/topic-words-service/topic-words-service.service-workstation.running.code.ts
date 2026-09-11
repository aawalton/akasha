import { runTopicWords } from "akasha/alan/track/daily/topic-words/topic-words.module.code.ts"

const NOTHING = "neither the wisdom words nor the intelligence topics landed"

export async function runService(): Promise<void> {
  const landed = await runTopicWords()
  if (landed.length === 0) throw new Error(NOTHING)
}
