import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pikewallFormation = {
  id: "01a0657d-0294-7e89-b99e-54e87a3027c4",
  type: "page-type/world-skill",
  slug: "pikewall-formation",
  title: "Pikewall Formation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
