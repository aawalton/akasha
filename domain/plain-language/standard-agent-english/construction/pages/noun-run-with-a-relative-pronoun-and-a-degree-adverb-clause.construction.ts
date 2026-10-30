import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithARelativePronounAndADegreeAdverbClause = {
  id: "01a18dc2-7705-794b-a8fb-44d325dd6406",
  type: "page-type/construction",
  slug: "noun-run-with-a-relative-pronoun-and-a-degree-adverb-clause",
  definition:
    "a noun group written from a noun run, a relative pronoun, a degree adverb and a verb phrase",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/relative-pronoun",
    "part-of-speech/degree-adverb",
    "phrase-kind/verb-phrase",
  ],
  admits: ["a browser that only looks", "a seat that still runs"],
  refuses: ["a browser only looks", "a browser that looks only", "a browser that only"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The degree adverb narrows the verb phrase after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A degree adverb before a verb is written only after a relative pronoun.",
    },
  ],
  createdAt: "2026-10-30T17:01:34.338Z",
  updatedAt: "2026-10-30T17:01:34.338Z",
} as const satisfies Construction
