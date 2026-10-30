import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithAProperNounHaveClause = {
  id: "01a18da5-770b-70eb-b987-8904eed2c681",
  type: "page-type/construction",
  slug: "noun-run-with-a-proper-noun-have-clause",
  definition:
    "a noun group written from a noun run, a proper noun, a form of have, and what was done",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/proper-noun",
    "part-of-speech/have-verb",
    "part-of-speech/past-participle",
  ],
  admits: ["the tracks Alan has heard", "a puzzle Alan has solved"],
  refuses: ["the tracks Alan heard has", "the tracks has Alan heard"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The noun run is what the proper noun has done something to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A form of have and a past participle with nothing after them is written only after a proper noun.",
    },
  ],
  createdAt: "2026-10-30T16:29:53.801Z",
  updatedAt: "2026-10-30T16:29:53.801Z",
} as const satisfies Construction
