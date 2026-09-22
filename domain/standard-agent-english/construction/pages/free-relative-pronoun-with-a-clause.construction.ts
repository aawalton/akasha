import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const freeRelativePronounWithAClause = {
  id: "01a0c68f-6d81-7ca8-948f-a44ea461c351",
  type: "page-type/construction",
  slug: "free-relative-pronoun-with-a-clause",
  definition: "a noun phrase written from a free relative pronoun and the clause naming it",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: [
    "part-of-speech/free-relative-pronoun",
    "phrase-kind/noun-phrase",
    "phrase-kind/verb-phrase",
  ],
  admits: ["what a file has", "who a message reaches", "what every rule set runs"],
  refuses: ["the what a file has", "page what a file has"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This is a noun phrase rather than a noun group, so nothing is written in front.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A preposition phrase after the verb is a construction named on no page yet.",
    },
  ],
} as const satisfies Construction
