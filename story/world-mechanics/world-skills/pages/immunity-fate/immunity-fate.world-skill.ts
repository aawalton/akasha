import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const immunityFate = {
  id: "01a06575-981d-7fdf-b22b-694bea5cb434",
  type: "world-skill",
  slug: "immunity-fate",
  title: "Immunity: Fate",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
