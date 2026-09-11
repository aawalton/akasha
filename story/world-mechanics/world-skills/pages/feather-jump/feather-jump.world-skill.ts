import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const featherJump = {
  id: "01a06575-980c-7552-89bd-3aecf48fb25b",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "feather-jump",
  title: "Feather Jump",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
