import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rapidRetreat = {
  id: "01a0657d-02a4-7856-a045-e0eb3bc354ac",
  type: "page-type/world-skill",
  slug: "rapid-retreat",
  title: "Rapid Retreat",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
