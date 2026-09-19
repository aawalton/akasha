import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const graceOfTheBastille = {
  id: "01a06575-9815-744a-997e-60c2a06289b8",
  type: "page-type/world-skill",
  slug: "grace-of-the-bastille",
  title: "Grace of the Bastille",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
