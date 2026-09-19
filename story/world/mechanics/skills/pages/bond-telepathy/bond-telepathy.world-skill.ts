import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bondTelepathy = {
  id: "01a06575-97f7-72c0-9abf-70269cf33ace",
  type: "page-type/world-skill",
  slug: "bond-telepathy",
  title: "Bond: Telepathy",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
