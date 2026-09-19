import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const razorfangs = {
  id: "01a0657d-02a4-7c91-bd00-42897c1b450c",
  type: "page-type/world-skill",
  slug: "razorfangs",
  title: "Razorfangs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
