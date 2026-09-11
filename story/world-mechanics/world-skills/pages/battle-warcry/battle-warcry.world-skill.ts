import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const battleWarcry = {
  id: "01a06575-97f4-76ce-815b-8ee0fae89ff9",
  type: "world-skill",
  slug: "battle-warcry",
  title: "Battle Warcry",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
