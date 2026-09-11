import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const basicFortificationConstruction = {
  id: "01a06575-97f3-77ed-979d-e84a61834e22",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "basic-fortification-construction",
  title: "Basic Fortification Construction",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
