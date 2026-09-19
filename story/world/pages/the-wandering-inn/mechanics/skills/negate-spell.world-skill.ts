import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const negateSpell = {
  id: "01a0657d-027a-7d1b-b7e0-1db8c2ef5238",
  type: "page-type/world-skill",
  slug: "negate-spell",
  title: "Negate Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
