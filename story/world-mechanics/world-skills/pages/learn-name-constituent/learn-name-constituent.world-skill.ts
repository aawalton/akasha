import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const learnNameConstituent = {
  id: "01a06575-9822-78ce-9cd1-5763fe306d7e",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "learn-name-constituent",
  title: "Learn Name: Constituent",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
