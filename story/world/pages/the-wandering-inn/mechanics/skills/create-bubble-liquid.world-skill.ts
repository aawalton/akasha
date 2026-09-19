import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const createBubbleLiquid = {
  id: "01a06575-97fe-7572-af8a-04f218dfc0cd",
  type: "page-type/world-skill",
  slug: "create-bubble-liquid",
  title: "Create Bubble Liquid",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
