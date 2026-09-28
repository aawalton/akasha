import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVDevelopment = {
  id: "01a0e9f9-22e8-7704-98c9-70dc0191d3f9",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-development",
  title: "Development",
  world: "world/ends-of-magic",
  aliases: ["Developments", "develop"],
  description: "The change of a Talent, skill or class into a new, stronger form.",
} as const satisfies WorldMechanic
