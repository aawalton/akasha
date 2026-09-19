import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const scavengerSStomach = {
  id: "01a0657d-02b8-7663-a5d1-220e4ba94cc6",
  type: "page-type/world-skill",
  slug: "scavenger-s-stomach",
  title: "Scavenger’s Stomach",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
