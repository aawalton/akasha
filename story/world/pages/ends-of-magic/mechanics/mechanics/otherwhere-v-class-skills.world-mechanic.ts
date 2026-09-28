import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVClassSkills = {
  id: "01a0e9f7-46bc-7bd8-9ec4-39e937d7e5f0",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-class-skills",
  title: "Class Skills",
  world: "world/ends-of-magic",
  aliases: ["class skill", "New Class skill"],
  description: "A skill belonging to a class.",
} as const satisfies WorldMechanic
