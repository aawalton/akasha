import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveAvowedStipend = {
  id: "01a0e9f2-f0a2-79b0-bc25-7e0d2e11bd1a",
  type: "page-type/world-mechanic",
  slug: "super-supportive-avowed-stipend",
  title: "Avowed stipend",
  world: "world/super-supportive",
  description: "A monthly Argold payment to new Avowed on Anesidora.",
} as const satisfies WorldMechanic
