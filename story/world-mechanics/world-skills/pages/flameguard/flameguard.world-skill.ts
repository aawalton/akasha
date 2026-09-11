import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const flameguard = {
  id: "01a06575-980d-7c10-890a-f78b044bd2f9",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "flameguard",
  title: "Flameguard",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
