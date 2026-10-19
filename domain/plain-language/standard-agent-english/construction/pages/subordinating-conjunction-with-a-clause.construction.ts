import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const subordinatingConjunctionWithAClause = {
  id: "01a0d3d1-a8d2-77f1-885c-38b0a2833677",
  type: "page-type/construction",
  slug: "subordinating-conjunction-with-a-clause",
  definition:
    "a noun phrase written from a subordinating conjunction and the whole clause it puts under",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: [
    "part-of-speech/subordinating-conjunction",
    "phrase-kind/noun-phrase",
    "phrase-kind/verb-phrase",
  ],
  admits: [
    "whether an agent is working",
    "whether a seat reads a page",
    "whether the file is stored",
  ],
  refuses: ["whether working", "the whether an agent is working", "whether an agent"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The clause here is whole, where a free relative pronoun's clause leaves that pronoun's slot open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This is a noun phrase rather than a noun group, so nothing is written in front.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clause saying when is opened by a time conjunction rather than written here.",
    },
  ],
  createdAt: "2026-09-24T14:28:47.954Z",
  updatedAt: "2026-10-19T17:46:50.583Z",
} as const satisfies Construction
