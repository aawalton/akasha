import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveSowingSpell = {
  id: "01a0e9f8-aa23-7d5a-9ce4-48632a6a4519",
  type: "page-type/world-spell",
  slug: "super-supportive-sowing-spell",
  title: "Sowing spell",
  world: "world/super-supportive",
  description:
    "A conversational chant that tells seeds about seeds carried by wind and animals, then disperses them evenly into the dirt.",
} as const satisfies WorldSpell
