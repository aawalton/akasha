import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveShitBirthdayPresent = {
  id: "01a0e9f0-3dfb-723e-8844-4fa66000f91f",
  type: "page-type/world-mechanic",
  slug: "super-supportive-shit-birthday-present",
  title: "Shit Birthday present",
  world: "world/super-supportive",
  aliases: ["Shit Sixteen present", "Shit Seventeen present", "Shit Affixation present"],
  description:
    "An Anesidoran custom of lavish gifts for a child who ages out of the expected selection window or affixes lower than expected.",
} as const satisfies WorldMechanic
