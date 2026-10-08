import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveStamina = {
  id: "01a0e9f7-dffb-7180-889d-5c5f6804ee71",
  type: "page-type/world-mechanic",
  slug: "super-supportive-stamina",
  title: "Stamina",
  world: "world/super-supportive",
  description: "A physical stat for endurance.",
  createdAt: "2026-09-28T21:42:11.195Z",
  updatedAt: "2026-09-28T21:42:14.000Z",
} as const satisfies WorldMechanic
