import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveAutotrade = {
  id: "01a0e9f0-3dfa-71cc-b690-259545be83c2",
  type: "page-type/world-mechanic",
  slug: "super-supportive-autotrade",
  title: "Autotrade",
  world: "world/super-supportive",
  description:
    "A trading-platform setting that accepts any match from a listing's wanted list automatically.",
} as const satisfies WorldMechanic
