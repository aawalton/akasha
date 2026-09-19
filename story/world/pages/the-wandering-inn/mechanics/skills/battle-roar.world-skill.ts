import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const battleRoar = {
  id: "01a06575-97f4-772d-92fd-c5ef66a8fc77",
  type: "page-type/world-skill",
  slug: "battle-roar",
  title: "Battle Roar",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
