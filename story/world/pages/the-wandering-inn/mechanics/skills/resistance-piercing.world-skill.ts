import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const resistancePiercing = {
  id: "01a0657d-02b1-7ee9-9397-f056ec306f72",
  type: "page-type/world-skill",
  slug: "resistance-piercing",
  title: "Resistance: Piercing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
