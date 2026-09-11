import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const shieldwallFormation = {
  id: "01a0657d-02c0-7f2e-9b6f-e65f73e6324a",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "shieldwall-formation",
  title: "Shieldwall Formation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
