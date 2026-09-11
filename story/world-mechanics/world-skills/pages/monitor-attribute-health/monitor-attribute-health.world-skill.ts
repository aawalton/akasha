import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const monitorAttributeHealth = {
  id: "01a0657d-026f-74d5-afa4-0695c0d181a6",
  type: "world-skill",
  slug: "monitor-attribute-health",
  title: "Monitor Attribute (Health)",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
