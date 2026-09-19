import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const detectGuilt = {
  id: "01a06575-9803-766c-8aa4-ddb83d21427a",
  type: "page-type/world-skill",
  slug: "detect-guilt",
  title: "Detect Guilt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
