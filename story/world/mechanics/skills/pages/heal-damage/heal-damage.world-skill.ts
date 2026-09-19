import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const healDamage = {
  id: "01a06575-9819-7a43-8f94-531f3b9f8870",
  type: "page-type/world-skill",
  slug: "heal-damage",
  title: "Heal Damage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
