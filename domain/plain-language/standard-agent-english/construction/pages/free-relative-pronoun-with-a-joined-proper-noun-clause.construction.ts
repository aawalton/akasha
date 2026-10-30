import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const freeRelativePronounWithAJoinedProperNounClause = {
  id: "01a18d78-0943-7136-bbae-9a2a7476f88c",
  type: "page-type/construction",
  slug: "free-relative-pronoun-with-a-joined-proper-noun-clause",
  definition:
    "a noun phrase written from a free relative pronoun and a clause whose subject is two proper nouns",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: [
    "part-of-speech/free-relative-pronoun",
    "part-of-speech/proper-noun",
    "part-of-speech/conjunction",
    "part-of-speech/proper-noun",
    "phrase-kind/verb-phrase",
  ],
  admits: ["what Alan and Jenny learn", "how Alan and Jenny spend money"],
  refuses: ["what Alan and Jenny", "what and Jenny learn"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The conjunction joins the two subjects and never two verb phrases.",
    },
  ],
  createdAt: "2026-10-30T15:40:16.577Z",
  updatedAt: "2026-10-30T15:40:16.577Z",
} as const satisfies Construction
