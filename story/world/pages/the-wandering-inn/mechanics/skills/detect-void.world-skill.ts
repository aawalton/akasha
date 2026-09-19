import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const detectVoid = {
  id: "01a06575-9803-72ed-b441-9f4fa4129dc5",
  type: "page-type/world-skill",
  slug: "detect-void",
  title: "Detect Void",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
