import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveLew = {
  id: "01a0e9f5-fded-739a-88e2-4cdf69456270",
  type: "page-type/world-title",
  slug: "super-supportive-lew",
  title: "LEW",
  world: "world/super-supportive",
  aliases: ["Longterm Earth-based Worker"],
  description: "A Wright who does power work for Artonans while still in high school.",
} as const satisfies WorldTitle
