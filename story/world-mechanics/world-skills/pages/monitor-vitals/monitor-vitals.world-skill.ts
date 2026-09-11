import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const monitorVitals = {
  id: "01a0657d-026f-7504-b37a-60acda708bef",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "monitor-vitals",
  title: "Monitor Vitals",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
