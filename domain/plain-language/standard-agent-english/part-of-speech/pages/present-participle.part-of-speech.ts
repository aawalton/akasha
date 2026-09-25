import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const presentParticiple = {
  id: "01a0ca12-8196-7ab3-8bb5-13118634eaed",
  type: "page-type/part-of-speech",
  slug: "present-participle",
  definition: "a word saying what a thing is doing",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A word closing in -ing that names a thing is a noun rather than one of these.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is doing the thing is named before the form of be.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A word written both here and as a noun makes a second parse wherever a noun comes before it.",
    },
  ],
} as const satisfies PartOfSpeech
