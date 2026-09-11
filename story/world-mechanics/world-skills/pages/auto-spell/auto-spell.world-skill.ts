import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const autoSpell = {
  id: "01a06575-97f0-7308-92f1-32131c363869",
  type: "world-skill",
  slug: "auto-spell",
  title: "Auto Spell",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
