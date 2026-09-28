import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveHomeRitual = {
  id: "01a0e9f8-aa22-7b9d-b1cf-a57a9396ad26",
  type: "page-type/world-spell",
  slug: "super-supportive-home-ritual",
  title: "Here-to-There home ritual",
  world: "world/super-supportive",
  aliases: ["communal casting", "collective casting"],
  description:
    "A group ritual where people in rings pass wood chips while speaking home words, ending in a fireball at sunrise.",
} as const satisfies WorldSpell
