import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveHappyAvowedDays = {
  id: "01a0e9fc-be82-7592-8d82-0c5ae9d99a54",
  type: "page-type/world-item",
  slug: "super-supportive-happy-avowed-days",
  title: "Happy Avowed Days",
  world: "world/super-supportive",
  description:
    "Scheduling software with an animated character who acts out the user's calendar as a superhuman.",
} as const satisfies WorldItem
