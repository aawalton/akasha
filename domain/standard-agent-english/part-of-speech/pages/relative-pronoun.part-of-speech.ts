import type { PartOfSpeech } from "akasha/domain/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const relativePronoun = {
  id: "01a0d428-a4ce-76be-a860-ad6dfb3fb3b5",
  type: "page-type/part-of-speech",
  slug: "relative-pronoun",
  definition: "a word opening a clause about the noun before it",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "relative pronoun" },
    { partOfSpeech: "part-of-speech/noun", spelling: "relative pronouns" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A word here takes the place in its clause of the noun written before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A free relative pronoun carries its own noun, and a word here takes the noun before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A relative pronoun is a closed class, so the words here are nearly all there are.",
    },
  ],
} as const satisfies PartOfSpeech
