import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveOriginalSkills = {
  id: "01a0e9f1-065f-7289-927a-8aa40742ab35",
  type: "page-type/world-mechanic",
  slug: "super-supportive-original-skills",
  title: "Original skills",
  world: "world/super-supportive",
  aliases: ["the originals", "original Avowed skills"],
  description: "The first three hundred or so skills designed for the Contract.",
} as const satisfies WorldMechanic
