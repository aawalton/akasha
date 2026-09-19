import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spotterSEye = {
  id: "01a0657d-02ee-7bea-b2b0-98a79ca9f113",
  type: "page-type/world-skill",
  slug: "spotter-s-eye",
  title: "Spotter’s Eye",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
