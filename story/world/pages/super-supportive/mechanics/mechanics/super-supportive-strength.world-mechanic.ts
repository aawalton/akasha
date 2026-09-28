import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveStrength = {
  id: "01a0e9f7-dffb-7470-a0ec-ba322b8dedef",
  type: "page-type/world-mechanic",
  slug: "super-supportive-strength",
  title: "Strength",
  world: "world/super-supportive",
  description: "A physical stat for raw bodily force.",
} as const satisfies WorldMechanic
