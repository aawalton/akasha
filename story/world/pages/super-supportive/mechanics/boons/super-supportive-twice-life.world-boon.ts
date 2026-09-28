import type { WorldBoon } from "akasha/story/world/mechanics/boons/world-boon.page-type.types.ts"

export const superSupportiveTwiceLife = {
  id: "01a0e9f0-79f4-7aae-a8ec-cebc09ad459c",
  type: "page-type/world-boon",
  slug: "super-supportive-twice-life",
  title: "Twice Life",
  world: "world/super-supportive",
  description: "A blessing that doubles a person's lifespan.",
} as const satisfies WorldBoon
