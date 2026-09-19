import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const incredibleAdhesive = {
  id: "01a06575-981e-7fdb-bf17-de3eb61651a9",
  type: "page-type/world-skill",
  slug: "incredible-adhesive",
  title: "Incredible Adhesive",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
