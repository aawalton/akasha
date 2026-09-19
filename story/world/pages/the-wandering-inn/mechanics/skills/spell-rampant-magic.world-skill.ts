import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spellRampantMagic = {
  id: "01a0657d-02ed-7116-841c-15f31f990cd5",
  type: "page-type/world-skill",
  slug: "spell-rampant-magic",
  title: "Spell: Rampant Magic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
