import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const automaticDodge = {
  id: "01a06575-97f0-72de-817d-df55428fddc4",
  type: "world-skill",
  slug: "automatic-dodge",
  title: "Automatic Dodge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
