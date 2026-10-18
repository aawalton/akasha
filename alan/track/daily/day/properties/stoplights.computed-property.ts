import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const stoplights = {
  id: "01a07224-bf20-74dd-b1bc-270ef3cf98c8",
  type: "page-type/computed-property",
  slug: "stoplights",
  propertySlug: "stoplights",
  definition: "the rung each resource reached on the day, as one colored light apiece",
  holds: "text",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The lights are the readouts the resources group draws, in the places it draws them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The readouts are read off the group's own index rather than named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each light is colored for the day through the rest days and scale its readout names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each reading is worked out for the day by the code the live reading runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout with no reading for the day is drawn as a white light.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A light with no reading leaves the other lights drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The plants are the food entries inside the window the day opened.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-05T15:16:45.984Z",
  updatedAt: "2026-10-18T14:03:35.488Z",
} as const satisfies ComputedProperty
