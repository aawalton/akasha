import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const cheatDeath = {
  id: "01a06575-97fb-7228-a63e-7cea1a9aa601",
  type: "page-type/world-skill",
  slug: "cheat-death",
  title: "Cheat Death",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
