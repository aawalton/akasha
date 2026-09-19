import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const distillBasicConcepts = {
  id: "01a06575-9804-71a5-a7e6-4ed02ed7084b",
  type: "page-type/world-skill",
  slug: "distill-basic-concepts",
  title: "Distill Basic Concepts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
