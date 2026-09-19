import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const catEye = {
  id: "01a06575-97fa-744c-9666-538634aafe9b",
  type: "page-type/world-skill",
  slug: "cat-eye",
  title: "Cat Eye",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
