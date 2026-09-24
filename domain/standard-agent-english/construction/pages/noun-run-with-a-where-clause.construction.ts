import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithAWhereClause = {
  id: "01a0d4d4-c97c-7c14-a851-723fab72cab0",
  type: "page-type/construction",
  slug: "noun-run-with-a-where-clause",
  definition: "a noun group written from a noun run and a clause saying what happens there",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/free-relative-pronoun",
    "phrase-kind/noun-phrase",
    "phrase-kind/verb-phrase",
  ],
  admits: [
    "an external service where people write stories",
    "the folder where a seat writes",
    "a place where Alan reads",
  ],
  refuses: ["a service where writes stories", "a service where people"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The clause after the noun run has a subject of its own.",
    },
  ],
} as const satisfies Construction
