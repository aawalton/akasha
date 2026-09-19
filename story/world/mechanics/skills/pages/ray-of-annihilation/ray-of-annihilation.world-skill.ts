import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rayOfAnnihilation = {
  id: "01a0657d-02a4-7ab3-a2dc-5a27c9c78efb",
  type: "page-type/world-skill",
  slug: "ray-of-annihilation",
  title: "Ray of Annihilation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
