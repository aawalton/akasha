import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const goodAsToday = {
  id: "01a06575-9815-7dbd-b64d-d539a26fe97e",
  type: "page-type/world-skill",
  slug: "good-as-today",
  title: "Good as Today",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
