import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithAnObjectAndAStrandedPrepositionClause = {
  id: "01a18dec-6b2d-7a54-ab6e-2464d7ab63a8",
  type: "page-type/construction",
  slug: "noun-run-with-an-object-and-a-stranded-preposition-clause",
  definition:
    "a noun group written from a noun run and a clause whose verb has an object and ends on a preposition",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/determiner",
    "phrase-kind/noun-group",
    "part-of-speech/verb",
    "part-of-speech/determiner",
    "phrase-kind/noun-group",
    "part-of-speech/preposition",
  ],
  admits: ["a thing a person spends a life on", "the shape a page type has its pages to"],
  refuses: ["a thing a person spends life on", "a thing spends a life on"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The noun run is what the preposition takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The object states a determiner of its own, so no clause ends the object.",
    },
  ],
  createdAt: "2026-10-30T17:47:23.819Z",
  updatedAt: "2026-10-30T17:47:23.819Z",
} as const satisfies Construction
