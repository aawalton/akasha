import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const supremeSpellcraft = {
  id: "01a0657d-0303-78df-a6f9-b628a811c0d2",
  type: "page-type/world-skill",
  slug: "supreme-spellcraft",
  title: "Supreme Spellcraft",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
