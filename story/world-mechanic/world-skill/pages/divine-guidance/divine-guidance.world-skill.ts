import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const divineGuidance = {
  id: "01a06575-9804-7f53-9c57-05cb38eed3c2",
  type: "world-skill",
  slug: "divine-guidance",
  title: "Divine Guidance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
