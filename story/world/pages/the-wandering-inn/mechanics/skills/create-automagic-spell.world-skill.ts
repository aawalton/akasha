import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const createAutomagicSpell = {
  id: "01a06575-97fe-7f3b-aea6-c0f528065222",
  type: "page-type/world-skill",
  slug: "create-automagic-spell",
  title: "Create Automagic Spell",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.574Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
