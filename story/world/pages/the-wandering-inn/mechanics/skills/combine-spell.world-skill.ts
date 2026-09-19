import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const combineSpell = {
  id: "01a06575-97fc-76df-8437-1cb239727ff8",
  type: "page-type/world-skill",
  slug: "combine-spell",
  title: "Combine Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
