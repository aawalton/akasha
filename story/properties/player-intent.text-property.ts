import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const playerIntent = {
  id: "01a103a5-8567-7000-97b1-83923adf8382",
  type: "page-type/text-property",
  slug: "player-intent",
  propertySlug: "player-intent",
  definition: "what the player wants his character doing across turns, as it is now",
  maxLength: 2000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story carries the player's intent as it is now, and keeps no history of it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A story the player has written no intent on states none.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-03T21:22:21.671Z",
  updatedAt: "2026-10-03T21:23:10.000Z",
} as const satisfies TextProperty
