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
  createdAt: "2026-09-28T21:43:02.946Z",
  updatedAt: "2026-09-28T21:43:06.000Z",
} as const satisfies WorldMechanic
