import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const monitorVitals = {
  id: "01a0657d-026f-7504-b37a-60acda708bef",
  type: "page-type/world-skill",
  slug: "monitor-vitals",
  title: "Monitor Vitals",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
