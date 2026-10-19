import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithATimeConjunctionAndAClause = {
  id: "01a15545-f558-764a-8aac-1d735492d4e0",
  type: "page-type/construction",
  slug: "noun-run-with-a-time-conjunction-and-a-clause",
  definition:
    "a noun group written from a noun run, a time conjunction and the whole clause it puts under",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/time-conjunction",
    "phrase-kind/noun-phrase",
    "phrase-kind/verb-phrase",
  ],
  admits: ["stop before its job is done", "process after its subagent is done"],
  refuses: ["stop before", "before its job is done stop"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The clause says when the thing the noun run names happens.",
    },
  ],
  createdAt: "2026-10-19T17:46:50.583Z",
  updatedAt: "2026-10-19T17:46:50.583Z",
} as const satisfies Construction
