import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const animateUndeadObjects = {
  id: "01a06575-97eb-7cb3-89b7-107a6fb018b6",
  type: "page-type/world-skill",
  slug: "animate-undead-objects",
  title: "Animate Undead (Objects)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
