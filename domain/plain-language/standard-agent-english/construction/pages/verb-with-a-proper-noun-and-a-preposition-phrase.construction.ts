import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const verbWithAProperNounAndAPrepositionPhrase = {
  id: "01a18d83-532b-7ef5-96af-626f89c1cb47",
  type: "page-type/construction",
  slug: "verb-with-a-proper-noun-and-a-preposition-phrase",
  definition:
    "a verb phrase written from a verb, the proper noun it acts on, and a preposition phrase",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: [
    "part-of-speech/verb",
    "part-of-speech/proper-noun",
    "phrase-kind/preposition-phrase",
  ],
  admits: ["an agent whose last message asks Alan for something"],
  refuses: ["asks for something Alan", "asks Alan for"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A proper noun takes no preposition phrase, so the phrase here belongs to the verb.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A noun phrase in place of the proper noun reads many phrases two ways, so it is not written.",
    },
  ],
  createdAt: "2026-10-30T15:52:36.392Z",
  updatedAt: "2026-10-30T15:52:36.392Z",
} as const satisfies Construction
