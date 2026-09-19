import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fakeDismemberment = {
  id: "01a06575-980b-78b0-bc1a-92f42f990fcb",
  type: "page-type/world-skill",
  slug: "fake-dismemberment",
  title: "Fake Dismemberment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
