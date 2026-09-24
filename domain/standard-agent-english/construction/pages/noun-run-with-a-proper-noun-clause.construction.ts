import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithAProperNounClause = {
  id: "01a0d484-35d6-7cef-acb4-ad2d3941c10c",
  type: "page-type/construction",
  slug: "noun-run-with-a-proper-noun-clause",
  definition: "a noun group written from a noun run and a clause whose subject is a proper noun",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: ["phrase-kind/noun-run", "part-of-speech/proper-noun", "phrase-kind/verb-phrase"],
  admits: ["a book Alan writes", "a book Alan reads", "the books Alan writes with a persona"],
  refuses: ["a book Alan", "a book writes Alan"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The proper noun says where the noun run ends, as a determiner does.",
    },
  ],
} as const satisfies Construction
