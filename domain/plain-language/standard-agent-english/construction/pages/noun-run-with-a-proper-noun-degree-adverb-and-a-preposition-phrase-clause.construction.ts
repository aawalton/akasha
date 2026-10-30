import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithAProperNounDegreeAdverbAndAPrepositionPhraseClause = {
  id: "01a18dc8-7fb6-76ac-a350-015dd4d1fd82",
  type: "page-type/construction",
  slug: "noun-run-with-a-proper-noun-degree-adverb-and-a-preposition-phrase-clause",
  definition:
    "a noun group made of a noun run, a proper noun, a verb, a degree adverb and a preposition phrase",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/proper-noun",
    "part-of-speech/verb",
    "part-of-speech/degree-adverb",
    "phrase-kind/preposition-phrase",
  ],
  admits: ["the tracks Alan hears most over a span of time"],
  refuses: ["the tracks Alan most hears over a span of time", "the tracks hears Alan most"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The noun run is what the proper noun does, and the degree adverb says how much.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A degree adverb after a verb is written only after a proper noun.",
    },
  ],
  createdAt: "2026-10-30T17:08:09.779Z",
  updatedAt: "2026-10-30T17:08:09.779Z",
} as const satisfies Construction
