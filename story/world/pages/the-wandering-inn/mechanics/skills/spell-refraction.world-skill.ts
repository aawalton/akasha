import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spellRefraction = {
  id: "01a0657d-02ed-77e7-873c-ffa96afb9172",
  type: "page-type/world-skill",
  slug: "spell-refraction",
  title: "Spell Refraction",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
