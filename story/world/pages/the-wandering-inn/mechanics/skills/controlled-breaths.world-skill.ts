import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const controlledBreaths = {
  id: "01a06575-97fd-73ca-bf15-68911d15e767",
  type: "page-type/world-skill",
  slug: "controlled-breaths",
  title: "Controlled Breaths",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
