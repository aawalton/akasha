import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rapidManeuvering = {
  id: "01a0657d-02a4-711d-91ec-61518c2ae78e",
  type: "page-type/world-skill",
  slug: "rapid-maneuvering",
  title: "Rapid Maneuvering",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
