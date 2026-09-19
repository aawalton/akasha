import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spellwardShields = {
  id: "01a0657d-02ed-717a-aa44-22a4e329bf99",
  type: "page-type/world-skill",
  slug: "spellward-shields",
  title: "Spellward Shields",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
