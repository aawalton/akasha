import type { PartOfSpeech } from "akasha/domain/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const subordinatingConjunction = {
  id: "01a0d3d1-8abe-70e6-930c-7ba6f7040d74",
  type: "page-type/part-of-speech",
  slug: "subordinating-conjunction",
  definition: "a word putting a whole clause under another phrase",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "subordinating conjunction" },
    { partOfSpeech: "part-of-speech/noun", spelling: "subordinating conjunctions" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A word here fills no slot in the clause it opens, so the clause is whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A conjunction joins two phrases as equals, and a word here does not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A subordinating conjunction is a closed class, so the words here are nearly all there are.",
    },
  ],
} as const satisfies PartOfSpeech
