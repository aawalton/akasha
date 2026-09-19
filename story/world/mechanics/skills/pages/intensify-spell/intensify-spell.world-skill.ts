import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const intensifySpell = {
  id: "01a06575-981f-7262-85fa-37dbb95dba2d",
  type: "page-type/world-skill",
  slug: "intensify-spell",
  title: "Intensify Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
