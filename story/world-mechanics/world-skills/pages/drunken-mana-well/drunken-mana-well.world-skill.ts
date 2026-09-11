import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const drunkenManaWell = {
  id: "01a06575-9806-7c38-84f4-b2a8357225d4",
  type: "world-skill",
  slug: "drunken-mana-well",
  title: "Drunken Mana Well",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
