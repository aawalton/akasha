import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicConcentration = {
  id: "01a06575-97f3-7c3e-b363-7bf7241c20fb",
  type: "page-type/world-skill",
  slug: "basic-concentration",
  title: "Basic Concentration",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
