import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const degreeAdverbWithAnAdjectiveAndABeClause = {
  id: "01a18d73-4942-7352-ba5b-bd05aa6a5cc8",
  type: "page-type/construction",
  slug: "degree-adverb-with-an-adjective-and-a-be-clause",
  definition:
    "a noun phrase written from a degree adverb, an adjective, a noun phrase and a form of be",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: [
    "part-of-speech/degree-adverb",
    "part-of-speech/adjective",
    "phrase-kind/noun-phrase",
    "part-of-speech/be-verb",
  ],
  admits: ["how hard a puzzle is", "how safe Alan's place is", "how far a place is"],
  refuses: ["how hard is a puzzle", "how hard a puzzle"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The adjective says what the noun phrase is, so the form of be ends the phrase.",
    },
  ],
  createdAt: "2026-10-30T15:35:05.275Z",
  updatedAt: "2026-10-30T15:35:05.275Z",
} as const satisfies Construction
