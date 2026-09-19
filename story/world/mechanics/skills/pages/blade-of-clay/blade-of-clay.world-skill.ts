import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bladeOfClay = {
  id: "01a06575-97f5-72e6-b7d5-2fa96a695a13",
  type: "page-type/world-skill",
  slug: "blade-of-clay",
  title: "Blade of Clay",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
