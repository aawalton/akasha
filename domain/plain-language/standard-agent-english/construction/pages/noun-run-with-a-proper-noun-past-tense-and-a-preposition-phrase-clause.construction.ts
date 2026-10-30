import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithAProperNounPastTenseAndAPrepositionPhraseClause = {
  id: "01a18dab-5797-7599-b010-d684c6c775e0",
  type: "page-type/construction",
  slug: "noun-run-with-a-proper-noun-past-tense-and-a-preposition-phrase-clause",
  definition:
    "a noun group written from a noun run, a proper noun, what it did, and a preposition phrase",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/proper-noun",
    "part-of-speech/past-tense",
    "phrase-kind/preposition-phrase",
  ],
  admits: ["the day Alan looked at a part of his chess", "the things Alan believed about a topic"],
  refuses: ["the day Alan at a part looked", "the things believed Alan about a topic"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The noun run is the time or the thing the proper noun did something about.",
    },
  ],
  createdAt: "2026-10-30T16:36:18.964Z",
  updatedAt: "2026-10-30T16:36:18.964Z",
} as const satisfies Construction
