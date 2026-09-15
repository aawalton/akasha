import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const createAutomagicSpell = {
  id: "01a06575-97fe-7f3b-aea6-c0f528065222",
  type: "world-skill",
  slug: "create-automagic-spell",
  title: "Create Automagic Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
