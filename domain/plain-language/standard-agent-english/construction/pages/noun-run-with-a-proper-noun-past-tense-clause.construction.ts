import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithAProperNounPastTenseClause = {
  id: "01a18daa-907d-743e-ab6d-cba5fabf390b",
  type: "page-type/construction",
  slug: "noun-run-with-a-proper-noun-past-tense-clause",
  definition: "a noun group written from a noun run, a proper noun, and what the proper noun did",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: ["phrase-kind/noun-run", "part-of-speech/proper-noun", "part-of-speech/past-tense"],
  admits: ["the day Alan opened", "a page Alan wrote"],
  refuses: ["a page wrote Alan", "a page Alan", "can wrote"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The noun run is what the proper noun did something to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A past tense is written only after a proper noun, so no modal or form of do comes before one.",
    },
  ],
  createdAt: "2026-10-30T16:35:27.994Z",
  updatedAt: "2026-10-30T16:35:27.994Z",
} as const satisfies Construction
