import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVUtilitySkills = {
  id: "01a0e9f7-46bc-78df-901a-9d478b580c1c",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-utility-skills",
  title: "Utility Skills",
  world: "world/ends-of-magic",
  aliases: ["utility skill", "Pending utility skill"],
  description: "A ranked skill belonging to no class.",
} as const satisfies WorldMechanic
