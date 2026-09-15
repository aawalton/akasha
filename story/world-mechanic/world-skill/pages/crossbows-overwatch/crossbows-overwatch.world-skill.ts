import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const crossbowsOverwatch = {
  id: "01a06575-97ff-7516-8cd9-9c21957eb9d2",
  type: "world-skill",
  slug: "crossbows-overwatch",
  title: "Crossbows: Overwatch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
