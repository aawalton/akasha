import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithAPossessiveSubjectClause = {
  id: "01a18ded-b199-7e5c-8091-fdd2c172cf44",
  type: "page-type/construction",
  slug: "noun-run-with-a-possessive-subject-clause",
  definition: "a noun group written from a noun run and a clause whose subject is a possessive",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/determiner",
    "phrase-kind/noun-run",
    "part-of-speech/possessive-clitic",
    "phrase-kind/noun-group",
    "phrase-kind/verb-phrase",
  ],
  admits: ["a thing a person's life is spent on", "the value a rule's condition expects"],
  refuses: ["a thing person's life is spent on", "a thing a person's life"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The possessor states a determiner of its own, as the subject of such a clause does.",
    },
  ],
  createdAt: "2026-10-30T17:48:47.383Z",
  updatedAt: "2026-10-30T17:48:47.383Z",
} as const satisfies Construction
