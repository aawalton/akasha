import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const caravanUnslowedMildTerrain = {
  id: "01a06575-97fa-75d6-8640-119ce3230f23",
  type: "world-skill",
  slug: "caravan-unslowed-mild-terrain",
  title: "Caravan Unslowed (Mild Terrain)",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
