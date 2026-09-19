import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flashBlow = {
  id: "01a06575-980d-7fe5-b0fa-338d1ea0cdf9",
  type: "page-type/world-skill",
  slug: "flash-blow",
  title: "Flash Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
