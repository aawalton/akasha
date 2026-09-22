import type { PartOfSpeech } from "akasha/domain/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const freeRelativePronoun = {
  id: "01a0c68c-8245-7617-b010-6cf185341ce2",
  type: "page-type/part-of-speech",
  slug: "free-relative-pronoun",
  definition: "a word naming the thing a clause leaves out, with no noun before it",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This word carries its own noun, so no noun is written before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relative pronoun written after a noun does another job, named on no page yet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word here names a thing, so a word naming a manner or a place is not one.",
    },
  ],
} as const satisfies PartOfSpeech
