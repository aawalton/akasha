import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const superSupportiveAvowedOnAssignment = {
  id: "01a0e9f5-fded-75a8-b866-a1b095e8e573",
  type: "page-type/world-condition",
  slug: "super-supportive-avowed-on-assignment",
  title: "Avowed on assignment",
  world: "world/super-supportive",
  aliases: ["red halo", "red ring", "dark red assignment halo"],
  description:
    "The status of an Avowed carrying out orders, shown on others' interfaces as a dark red halo over the head.",
} as const satisfies WorldCondition
