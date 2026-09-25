import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const verb = {
  id: "01a0c677-ca51-7407-b1ca-e2a16319c088",
  type: "page-type/part-of-speech",
  slug: "verb",
  definition: "a word saying what a thing does",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "verb" },
    { partOfSpeech: "part-of-speech/noun", spelling: "verbs" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A verb is an open class, so the words here are a few of many.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word stating a verb states the spelling one thing takes.",
    },
  ],
} as const satisfies PartOfSpeech
