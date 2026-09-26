import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const haremHotelAttackResolution = {
  id: "01a0de4f-b413-77b3-9c4c-10de6f313ef8",
  type: "page-type/world-check",
  slug: "harem-hotel-attack-resolution",
  title: "Attack Resolution",
  definition:
    "whether a strike in the Harem Hotel lands, which band it lands in, and the damage it deals",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A strike in the Harem Hotel is settled by the rule a strike in the Tower is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A strike's attack power and defence are the derived metrics of the two sides.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A strike at the body sets physical attack against physical defence.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A strike at the mind sets mental attack against mental defence.",
    },
  ],
} as const satisfies WorldCheck
