import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveHandCasting = {
  id: "01a0e9f1-065e-7817-9ec7-44dac1f69a0d",
  type: "page-type/world-mechanic",
  slug: "super-supportive-hand-casting",
  title: "Hand casting",
  world: "world/super-supportive",
  aliases: ["wizardry", "spellcasting"],
  description:
    "Working a wizard spell by weaving authority through finger patterns, often with chants or tools.",
} as const satisfies WorldMechanic
