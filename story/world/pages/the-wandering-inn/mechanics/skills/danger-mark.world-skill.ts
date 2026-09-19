import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dangerMark = {
  id: "01a06575-9800-7901-b24b-822da4355d01",
  type: "page-type/world-skill",
  slug: "danger-mark",
  title: "Danger Mark",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
