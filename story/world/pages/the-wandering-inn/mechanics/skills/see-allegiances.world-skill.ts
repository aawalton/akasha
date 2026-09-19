import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const seeAllegiances = {
  id: "01a0657d-02b8-7c38-ac4d-10afe2d5eb41",
  type: "page-type/world-skill",
  slug: "see-allegiances",
  title: "See Allegiances",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
