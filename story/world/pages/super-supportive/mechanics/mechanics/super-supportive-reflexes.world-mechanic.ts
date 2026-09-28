import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveReflexes = {
  id: "01a0e9f7-dffa-7e9e-a336-f6cfc6e9b66b",
  type: "page-type/world-mechanic",
  slug: "super-supportive-reflexes",
  title: "Reflexes",
  world: "world/super-supportive",
  description: "A stat for how quickly the body reacts.",
} as const satisfies WorldMechanic
