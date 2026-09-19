import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const assertCommand = {
  id: "01a06575-97ee-7406-af89-7d591abeddef",
  type: "page-type/world-skill",
  slug: "assert-command",
  title: "Assert Command",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
