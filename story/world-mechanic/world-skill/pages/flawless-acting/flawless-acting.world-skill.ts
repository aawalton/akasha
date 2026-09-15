import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const flawlessActing = {
  id: "01a06575-980e-744a-b285-25ea209dd8b1",
  type: "world-skill",
  slug: "flawless-acting",
  title: "Flawless Acting",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
