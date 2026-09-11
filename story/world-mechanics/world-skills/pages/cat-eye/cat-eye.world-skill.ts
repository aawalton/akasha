import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const catEye = {
  id: "01a06575-97fa-744c-9666-538634aafe9b",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "cat-eye",
  title: "Cat Eye",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
