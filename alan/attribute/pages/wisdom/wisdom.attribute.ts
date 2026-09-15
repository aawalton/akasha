import type { Attribute } from "akasha/alan/attribute/attribute.page-type.types.ts"

export const wisdom = {
  id: "01a06841-a1cb-7072-8aa0-eb11c0a4258b",
  type: "page-type/attribute",
  slug: "wisdom",
  definition: "what Alan has built by learning about himself",
  pointUnit: "10,000 words added to an all-about-alan topic",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Ten thousand words added is one point.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The points are the words about Alan the day carries turned into points.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day with no words earns nothing rather than a wisdom of zero.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here counts the words a commit added.",
    },
  ],
} as const satisfies Attribute
