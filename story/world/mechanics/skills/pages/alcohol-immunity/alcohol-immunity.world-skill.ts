import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const alcoholImmunity = {
  id: "01a06575-97ea-75f7-b305-83c39b08562b",
  type: "page-type/world-skill",
  slug: "alcohol-immunity",
  title: "Alcohol Immunity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
