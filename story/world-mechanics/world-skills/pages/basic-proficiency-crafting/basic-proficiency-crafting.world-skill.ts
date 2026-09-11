import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const basicProficiencyCrafting = {
  id: "01a06575-97f4-7f3a-a3ee-d71a4f8ae009",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "basic-proficiency-crafting",
  title: "Basic Proficiency: Crafting",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
