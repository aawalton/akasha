import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stonewallFormation = {
  id: "01a0657d-02fa-72f0-ab9b-28551540bf8e",
  type: "page-type/world-skill",
  slug: "stonewall-formation",
  title: "Stonewall Formation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
