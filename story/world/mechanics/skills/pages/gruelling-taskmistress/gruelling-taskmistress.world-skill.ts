import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const gruellingTaskmistress = {
  id: "01a06575-9817-7a5a-9d61-251b1ef77fcd",
  type: "page-type/world-skill",
  slug: "gruelling-taskmistress",
  title: "Gruelling Taskmistress",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
