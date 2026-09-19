import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const kingslayerRounds = {
  id: "01a06575-9821-743b-81f5-6ba0a6c5dff0",
  type: "page-type/world-skill",
  slug: "kingslayer-rounds",
  title: "Kingslayer Rounds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
