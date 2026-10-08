import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithAPastParticiple = {
  id: "01a0c96f-a254-7982-aacd-b072d43b1006",
  type: "page-type/construction",
  slug: "noun-run-with-a-past-participle",
  definition: "a noun group written from a noun run and a word saying what was done to it",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: ["phrase-kind/noun-run", "part-of-speech/past-participle"],
  admits: ["places gathered", "page values changed", "item set ids marked"],
  refuses: ["gathered places", "gathered"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What was done is written after the noun run rather than before it.",
    },
  ],
  createdAt: "2026-09-22T14:05:31.604Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies Construction
