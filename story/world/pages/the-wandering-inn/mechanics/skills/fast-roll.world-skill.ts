import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastRoll = {
  id: "01a06575-980b-78e8-ae99-a89183281749",
  type: "page-type/world-skill",
  slug: "fast-roll",
  title: "Fast Roll",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
