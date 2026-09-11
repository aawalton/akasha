import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const callForAid = {
  id: "01a06575-97f9-7891-98e2-9a6c9376d44e",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "call-for-aid",
  title: "Call for Aid",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
