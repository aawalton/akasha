import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const monitorAttributeHealth = {
  id: "01a0657d-026f-74d5-afa4-0695c0d181a6",
  type: "page-type/world-skill",
  slug: "monitor-attribute-health",
  title: "Monitor Attribute (Health)",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.575Z",
  updatedAt: "2026-09-22T13:32:52.000Z",
} as const satisfies WorldSkill
