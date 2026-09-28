import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSpellAbbreviation = {
  id: "01a0e9f8-aa22-735d-8ae4-9355a17ad248",
  type: "page-type/world-mechanic",
  slug: "super-supportive-spell-abbreviation",
  title: "Spell abbreviation",
  world: "world/super-supportive",
  aliases: ["abbreviated spell"],
  description:
    "Casting a small common spell with fewer gestures by putting more insistent authority behind them.",
} as const satisfies WorldMechanic
