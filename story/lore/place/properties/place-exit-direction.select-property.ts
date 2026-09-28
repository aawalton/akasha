import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const placeExitDirection = {
  id: "01a0e852-6698-7328-af74-74fd83f985b4",
  type: "page-type/select-property",
  slug: "place-exit-direction",
  propertySlug: "direction",
  definition: "which way an exit leads out of a place",
  values: ["north", "east", "south", "west", "up", "down"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An exit whose direction the story has not told names no direction.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
