import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const detectGuilt = {
  id: "01a06575-9803-766c-8aa4-ddb83d21427a",
  type: "world-skill",
  slug: "detect-guilt",
  title: "Detect Guilt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
