import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const assertAuthority = {
  id: "01a06575-97ee-78ea-8e50-8481f614e49f",
  type: "page-type/world-skill",
  slug: "assert-authority",
  title: "Assert Authority",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
