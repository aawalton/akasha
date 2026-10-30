import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithAProperNounHaveNotClause = {
  id: "01a18da6-457d-70fd-9bc8-de6c754bc0d6",
  type: "page-type/construction",
  slug: "noun-run-with-a-proper-noun-have-not-clause",
  definition:
    "a noun group written from a noun run, a proper noun, a form of have, a negator, and what was done",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/proper-noun",
    "part-of-speech/have-verb",
    "part-of-speech/negator",
    "part-of-speech/past-participle",
  ],
  admits: ["the tracks Alan has not heard", "a puzzle Alan has not solved"],
  refuses: ["the tracks Alan not has heard", "the tracks Alan has heard not"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The noun run is what the proper noun has not done something to.",
    },
  ],
  createdAt: "2026-10-30T16:30:46.648Z",
  updatedAt: "2026-10-30T16:30:46.648Z",
} as const satisfies Construction
