import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spellAttractor = {
  id: "01a0657d-02ed-76c9-8441-bebe970917a7",
  type: "page-type/world-skill",
  slug: "spell-attractor",
  title: "Spell Attractor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
