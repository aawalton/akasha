import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const criminalInstincts = {
  id: "01a06575-97ff-7678-a07c-5b62a4816447",
  type: "page-type/world-skill",
  slug: "criminal-instincts",
  title: "Criminal Instincts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
