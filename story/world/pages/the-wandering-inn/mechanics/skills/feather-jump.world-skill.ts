import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const featherJump = {
  id: "01a06575-980c-7552-89bd-3aecf48fb25b",
  type: "page-type/world-skill",
  slug: "feather-jump",
  title: "Feather Jump",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
