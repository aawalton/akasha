import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const forewarnedDanger = {
  id: "01a06575-9810-7f95-a1a9-6e5f1277e7c4",
  type: "world-skill",
  slug: "forewarned-danger",
  title: "Forewarned Danger",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
