import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fakeSmile = {
  id: "01a06575-980b-749c-9927-41f4d1339e3f",
  type: "page-type/world-skill",
  slug: "fake-smile",
  title: "Fake Smile",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
