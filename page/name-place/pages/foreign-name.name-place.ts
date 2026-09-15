import type { NamePlace } from "akasha/page/name-place/name-place.page-type.types.ts"

export const foreignName = {
  id: "01a04feb-819f-7c88-a837-385bf1c6a294",
  type: "page-type/name-place",
  slug: "foreign-name",
  definition: "a name whose owner is outside akasha",
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name is its owner's where renaming the name would break a reader outside akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name its owner spells is judged by no format here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Akasha never states that format.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That format is the owner's to change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This name place licenses a name rather than a folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name beside a name its owner spells still answers the test alone.",
    },
  ],
} as const satisfies NamePlace
