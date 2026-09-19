import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const armedAtAllTimes = {
  id: "01a06575-97ec-7d7d-8234-485c5ca28e00",
  type: "page-type/world-skill",
  slug: "armed-at-all-times",
  title: "Armed At All Times",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
