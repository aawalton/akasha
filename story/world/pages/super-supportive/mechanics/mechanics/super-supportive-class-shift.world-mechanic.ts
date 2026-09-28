import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveClassShift = {
  id: "01a0e9f5-fded-7268-b421-352d0e4d1348",
  type: "page-type/world-mechanic",
  slug: "super-supportive-class-shift",
  title: "class shift",
  world: "world/super-supportive",
  description: "An Artonan moving from their birth class into the other class.",
} as const satisfies WorldMechanic
