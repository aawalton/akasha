import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const groundLightning = {
  id: "01a06575-9817-7651-bd60-6ac92b363b50",
  type: "page-type/world-skill",
  slug: "ground-lightning",
  title: "Ground Lightning",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
