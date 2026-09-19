import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stainlessFabric = {
  id: "01a0657d-02ee-78a9-bb38-c84af1c842d0",
  type: "page-type/world-skill",
  slug: "stainless-fabric",
  title: "Stainless Fabric",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
