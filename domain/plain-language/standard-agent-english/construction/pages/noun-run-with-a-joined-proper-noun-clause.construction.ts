import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithAJoinedProperNounClause = {
  id: "01a18d78-0943-7ea1-b09b-e132fab9a0d0",
  type: "page-type/construction",
  slug: "noun-run-with-a-joined-proper-noun-clause",
  definition:
    "a noun group written from a noun run and a clause whose subject is two proper nouns joined",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/proper-noun",
    "part-of-speech/conjunction",
    "part-of-speech/proper-noun",
    "phrase-kind/verb-phrase",
  ],
  admits: ["the notes Alan and Jenny keep", "the notes Alan and Jenny keep about a book"],
  refuses: ["the notes Alan and Jenny", "the notes and Jenny keep"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The conjunction joins the two subjects and never two verb phrases.",
    },
  ],
  createdAt: "2026-10-30T15:40:16.577Z",
  updatedAt: "2026-10-30T15:40:16.577Z",
} as const satisfies Construction
