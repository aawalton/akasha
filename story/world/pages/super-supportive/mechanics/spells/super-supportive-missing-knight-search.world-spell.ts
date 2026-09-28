import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveMissingKnightSearch = {
  id: "01a0e9f9-7734-7953-8022-156079ec1440",
  type: "page-type/world-spell",
  slug: "super-supportive-missing-knight-search",
  title: "Missing-knight finding magic",
  world: "world/super-supportive",
  description:
    "Magic for finding a lost knight from samples of the area, an amplifier of their origin, and a hand-made map.",
} as const satisfies WorldSpell
