import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const armorPiercingLowBlow = {
  id: "01a06575-97ec-7592-9e2a-bb328c5912f9",
  type: "page-type/world-skill",
  slug: "armor-piercing-low-blow",
  title: "Armor-piercing Low Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
