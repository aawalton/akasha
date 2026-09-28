import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVBuilds = {
  id: "01a0ea00-21ad-74fd-8a0d-e9692818f09d",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-builds",
  title: "Builds",
  world: "world/ends-of-magic",
  aliases: ["build"],
  description: "A person's whole combination of Talents, classes and skills.",
} as const satisfies WorldMechanic
