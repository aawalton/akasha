import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveDiamondStarEmployer = {
  id: "01a0e9fb-2b67-740a-98a9-b4afc1dc482e",
  type: "page-type/world-title",
  slug: "super-supportive-diamond-star-employer",
  title: "Diamond Star Employer",
  world: "world/super-supportive",
  description:
    "A Rabbit business program status for employers who give new Rabbits part-time jobs.",
} as const satisfies WorldTitle
