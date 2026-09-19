import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const agonizingCut = {
  id: "01a06575-97ea-7012-bdf1-d87a951ecfb7",
  type: "page-type/world-skill",
  slug: "agonizing-cut",
  title: "Agonizing Cut",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
