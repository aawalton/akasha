import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const goodAsToday = {
  id: "01a06575-9815-7dbd-b64d-d539a26fe97e",
  type: "world-skill",
  slug: "good-as-today",
  title: "Good as Today",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
