import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const identifyTrueNameDaily = {
  id: "01a06575-981c-79e4-b4e0-f24b8c1749e0",
  type: "page-type/world-skill",
  slug: "identify-true-name-daily",
  title: "Identify True Name (Daily)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
