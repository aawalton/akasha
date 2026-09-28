import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveClassHoarding = {
  id: "01a0e9f0-3dfa-7700-88b7-ceea4bd92845",
  type: "page-type/world-mechanic",
  slug: "super-supportive-class-hoarding",
  title: "Class hoarding",
  world: "world/super-supportive",
  description:
    "A family's practice of keeping one class among its children through trades and bonuses.",
} as const satisfies WorldMechanic
