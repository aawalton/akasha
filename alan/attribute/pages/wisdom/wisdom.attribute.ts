import type { Attribute } from "akasha/alan/attribute/attribute.page-type.types.ts"

export const wisdom = {
  id: "01a06841-a1cb-7072-8aa0-eb11c0a4258b",
  type: "page-type/attribute",
  slug: "wisdom",
  definition: "the capacity Alan has from what Alan learns about himself",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "wisdom" }],
  pointUnit: "10,000 words added to an all-about-alan topic",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Ten thousand words added is one point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The points are the words about Alan the day carries turned into points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day with no words earns nothing rather than a wisdom of zero.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here counts the words a commit added.",
    },
  ],
  createdAt: "2026-09-03T17:12:06.859Z",
  updatedAt: "2026-10-30T16:03:36.468Z",
} as const satisfies Attribute
