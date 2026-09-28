import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const superSupportiveMissingOnAssignment = {
  id: "01a0e9f3-f5f6-729b-85c6-43d65eff1acd",
  type: "page-type/world-condition",
  slug: "super-supportive-missing-on-assignment",
  title: "Missing on Assignment",
  world: "world/super-supportive",
  aliases: [
    "Irretrievable due to Teleportation Failure",
    "Presumed Dead due to Teleportation Failure",
  ],
  description: "A System status for an Avowed lost on a quest.",
} as const satisfies WorldCondition
