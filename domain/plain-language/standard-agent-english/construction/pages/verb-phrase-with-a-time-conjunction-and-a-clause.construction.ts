import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const verbPhraseWithATimeConjunctionAndAClause = {
  id: "01a15545-f559-7367-a52f-e56e6f1c778c",
  type: "page-type/construction",
  slug: "verb-phrase-with-a-time-conjunction-and-a-clause",
  definition:
    "a verb phrase written from a verb phrase, a time conjunction and the whole clause it puts under",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: [
    "phrase-kind/verb-phrase",
    "part-of-speech/time-conjunction",
    "phrase-kind/noun-phrase",
    "phrase-kind/verb-phrase",
  ],
  admits: [
    "runs until its work is done",
    "makes before its job is done",
    "shows before the change is kept",
  ],
  refuses: ["runs until", "runs until its work"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The clause says when the verb phrase before it happens.",
    },
  ],
  createdAt: "2026-10-19T17:46:50.583Z",
  updatedAt: "2026-10-19T17:46:50.583Z",
} as const satisfies Construction
