import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arrowguardShield = {
  id: "01a06575-97ed-7e56-8147-2f7d93d8e820",
  type: "page-type/world-skill",
  slug: "arrowguard-shield",
  title: "Arrowguard Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
