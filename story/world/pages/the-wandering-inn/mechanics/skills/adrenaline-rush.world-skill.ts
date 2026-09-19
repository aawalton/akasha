import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const adrenalineRush = {
  id: "01a06575-97e9-76a9-ac48-1bcc30c36b62",
  type: "page-type/world-skill",
  slug: "adrenaline-rush",
  title: "Adrenaline Rush",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
