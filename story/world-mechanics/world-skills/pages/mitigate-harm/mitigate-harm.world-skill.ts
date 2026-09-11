import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const mitigateHarm = {
  id: "01a0657d-026f-7eda-bf78-1be9200e28a0",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "mitigate-harm",
  title: "Mitigate Harm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
