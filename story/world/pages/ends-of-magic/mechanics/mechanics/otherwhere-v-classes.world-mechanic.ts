import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVClasses = {
  id: "01a0e9f4-b58b-76b0-96e5-32ad38b6c219",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-classes",
  title: "Classes",
  world: "world/ends-of-magic",
  aliases: ["class"],
  description:
    "A calling a person chooses from Davrar's offers, which carries levels and class skills.",
} as const satisfies WorldMechanic
