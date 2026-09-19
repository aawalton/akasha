import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicProficiencySwords = {
  id: "01a06575-97f4-7fd3-87ef-a35cf8378dac",
  type: "page-type/world-skill",
  slug: "basic-proficiency-swords",
  title: "Basic Proficiency: Swords",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
