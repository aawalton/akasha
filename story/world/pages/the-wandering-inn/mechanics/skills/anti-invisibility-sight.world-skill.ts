import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const antiInvisibilitySight = {
  id: "01a06575-97eb-7499-b675-d1a552a3f1b7",
  type: "page-type/world-skill",
  slug: "anti-invisibility-sight",
  title: "Anti-Invisibility Sight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
