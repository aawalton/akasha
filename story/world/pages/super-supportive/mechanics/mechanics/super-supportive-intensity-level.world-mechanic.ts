import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveIntensityLevel = {
  id: "01a0e9f7-dffa-71aa-b8cb-f6acc8fd0c9c",
  type: "page-type/world-mechanic",
  slug: "super-supportive-intensity-level",
  title: "Intensity Level",
  world: "world/super-supportive",
  description: "A rating on options offered by Mother.",
} as const satisfies WorldMechanic
