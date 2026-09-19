import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const countercharge = {
  id: "01a06575-97fe-7708-a9ad-2c6dc468a465",
  type: "page-type/world-skill",
  slug: "countercharge",
  title: "Countercharge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
