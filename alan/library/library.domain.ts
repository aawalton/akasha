import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const library = {
  id: "01a06574-0291-7000-bfeb-0932b2156cac",
  type: "page-type/domain",
  slug: "library",
  definition: "what Alan works through, and how far through it he has got",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "library" },
    { partOfSpeech: "part-of-speech/noun", spelling: "libraries" },
  ],
  parts: ["domain/reading", "domain/studying", "domain/watching", "page-type/litrpg-collection"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Everything kept here is a collection.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A work is one collection.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An instalment of a work is one collection.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shelf of works is one collection.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which collection has which collection is the one edge every part of this domain is read along.",
    },
  ],
} as const satisfies Domain
