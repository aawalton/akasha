import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const elvenConcentration = {
  id: "01a06575-9807-7e1f-bad5-758c6637f8fb",
  type: "page-type/world-skill",
  slug: "elven-concentration",
  title: "Elven Concentration",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
