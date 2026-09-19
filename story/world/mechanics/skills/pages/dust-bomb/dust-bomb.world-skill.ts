import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dustBomb = {
  id: "01a06575-9806-793a-bdeb-8af62d108ef7",
  type: "page-type/world-skill",
  slug: "dust-bomb",
  title: "Dust Bomb",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
