import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const reinforceSpell = {
  id: "01a0657d-02a6-7245-8aa1-b6261d89031b",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "reinforce-spell",
  title: "Reinforce Spell",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
