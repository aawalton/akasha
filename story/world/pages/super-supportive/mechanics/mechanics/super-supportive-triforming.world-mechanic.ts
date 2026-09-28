import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveTriforming = {
  id: "01a0e9f1-cfc2-73c7-9b08-e40ad182bc2c",
  type: "page-type/world-mechanic",
  slug: "super-supportive-triforming",
  title: "Triforming",
  world: "world/super-supportive",
  description:
    "A clearing of chaos by lifting corrupted soil into the sky and slamming it back as stronger reality.",
} as const satisfies WorldMechanic
