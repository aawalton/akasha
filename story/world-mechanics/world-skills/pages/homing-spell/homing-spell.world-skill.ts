import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const homingSpell = {
  id: "01a06575-981a-7ea6-95a4-35b75d404107",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "homing-spell",
  title: "Homing Spell",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
