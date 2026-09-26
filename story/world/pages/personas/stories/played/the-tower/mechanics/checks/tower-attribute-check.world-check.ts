import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const towerAttributeCheck = {
  id: "01a0de1d-a3b3-7566-8cf0-d6c0a70d3ade",
  type: "page-type/world-check",
  slug: "tower-attribute-check",
  title: "Attribute Check",
  definition:
    "whether a lethal or contested act in the Tower outside combat comes off, and by how much",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An act is settled as a strike of the attribute against the act's difficulty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That strike has a base of one and engages no weakness, so its gate is one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act reads by the band that strike lands in.",
    },
  ],
} as const satisfies WorldCheck
