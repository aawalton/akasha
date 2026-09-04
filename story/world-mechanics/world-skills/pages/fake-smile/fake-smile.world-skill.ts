import type { WorldSkill } from "../../world-skill.page-type.ts"

export const fakeSmile = {
  id: "01a06575-980b-749c-9927-41f4d1339e3f",
  pageTypeSlug: "world-skill",
  slug: "fake-smile",
  title: "Fake Smile",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
