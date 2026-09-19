import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flawlessParry = {
  id: "01a06575-980e-7216-b1f6-be26b5409ec6",
  type: "page-type/world-skill",
  slug: "flawless-parry",
  title: "Flawless Parry",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
