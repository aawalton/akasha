import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spearwallFormation = {
  id: "01a0657d-02ed-7a08-a2a2-bfc52f9762de",
  type: "page-type/world-skill",
  slug: "spearwall-formation",
  title: "Spearwall Formation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
