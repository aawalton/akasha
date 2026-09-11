import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const rangedDodge = {
  id: "01a0657d-029c-7b1e-8eea-e3e345ff1d0a",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "ranged-dodge",
  title: "Ranged Dodge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
