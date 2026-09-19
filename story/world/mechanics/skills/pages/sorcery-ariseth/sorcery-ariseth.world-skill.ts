import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sorceryAriseth = {
  id: "01a0657d-02c7-7a98-b2b7-056ceb20748e",
  type: "page-type/world-skill",
  slug: "sorcery-ariseth",
  title: "Sorcery Ariseth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
