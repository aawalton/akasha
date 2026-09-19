import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const extendedBattery = {
  id: "01a06575-980a-7f72-b429-31188ccd556a",
  type: "page-type/world-skill",
  slug: "extended-battery",
  title: "Extended Battery",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
