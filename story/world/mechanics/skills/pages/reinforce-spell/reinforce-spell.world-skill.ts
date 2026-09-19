import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reinforceSpell = {
  id: "01a0657d-02a6-7245-8aa1-b6261d89031b",
  type: "page-type/world-skill",
  slug: "reinforce-spell",
  title: "Reinforce Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
