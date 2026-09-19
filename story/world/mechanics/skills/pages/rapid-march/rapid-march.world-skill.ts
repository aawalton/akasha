import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rapidMarch = {
  id: "01a0657d-02a4-75ff-8dc6-111b08c10695",
  type: "page-type/world-skill",
  slug: "rapid-march",
  title: "Rapid March",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
