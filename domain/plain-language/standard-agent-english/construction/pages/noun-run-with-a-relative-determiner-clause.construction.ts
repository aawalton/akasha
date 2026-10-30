import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithARelativeDeterminerClause = {
  id: "01a18d7e-1613-78a0-a79f-4d8276368f28",
  type: "page-type/construction",
  slug: "noun-run-with-a-relative-determiner-clause",
  definition: "a noun group written from a noun run and a clause about a thing that noun run has",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/relative-determiner",
    "phrase-kind/noun-group",
    "phrase-kind/verb-phrase",
  ],
  admits: [
    "an agent whose role is on call",
    "the person whose device has a token",
    "the module property group whose code writes a property's file",
  ],
  refuses: ["an agent whose is on call", "an agent whose role"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The noun group after the relative determiner is the subject of the clause.",
    },
  ],
  createdAt: "2026-10-30T15:46:53.072Z",
  updatedAt: "2026-10-30T15:46:53.072Z",
} as const satisfies Construction
