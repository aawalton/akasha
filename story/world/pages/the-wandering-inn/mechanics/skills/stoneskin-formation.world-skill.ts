import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stoneskinFormation = {
  id: "01a0657d-02fa-7dcd-afaf-f9c9238db3de",
  type: "page-type/world-skill",
  slug: "stoneskin-formation",
  title: "Stoneskin Formation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
