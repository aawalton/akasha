import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const ironshell = {
  id: "01a06575-9820-7776-9403-f94cacdd2eae",
  type: "world-skill",
  slug: "ironshell",
  title: "Ironshell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
