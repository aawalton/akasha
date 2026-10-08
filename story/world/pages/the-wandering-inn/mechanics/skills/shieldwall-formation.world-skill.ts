import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldwallFormation = {
  id: "01a0657d-02c0-7f2e-9b6f-e65f73e6324a",
  type: "page-type/world-skill",
  slug: "shieldwall-formation",
  title: "Shieldwall Formation",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.656Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
