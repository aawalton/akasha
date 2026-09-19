import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overchargeSpell = {
  id: "01a0657d-027f-74e1-ae5a-4ceb7ba39f63",
  type: "page-type/world-skill",
  slug: "overcharge-spell",
  title: "Overcharge Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
