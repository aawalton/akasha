import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveStamina = {
  id: "01a0e9f7-dffb-7180-889d-5c5f6804ee71",
  type: "page-type/world-mechanic",
  slug: "super-supportive-stamina",
  title: "Stamina",
  world: "world/super-supportive",
  description: "A physical stat for endurance.",
} as const satisfies WorldMechanic
