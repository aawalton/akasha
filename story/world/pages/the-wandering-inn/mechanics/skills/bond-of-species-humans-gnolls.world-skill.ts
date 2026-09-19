import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bondOfSpeciesHumansGnolls = {
  id: "01a06575-97f7-7fee-88ab-8322e63c495f",
  type: "page-type/world-skill",
  slug: "bond-of-species-humans-gnolls",
  title: "Bond of Species (Humans, Gnolls)",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
