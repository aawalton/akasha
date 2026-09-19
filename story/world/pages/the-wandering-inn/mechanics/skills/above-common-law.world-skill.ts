import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aboveCommonLaw = {
  id: "01a06575-97e7-737c-8799-f7aeaf930fbb",
  type: "page-type/world-skill",
  slug: "above-common-law",
  title: "Above Common Law",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
