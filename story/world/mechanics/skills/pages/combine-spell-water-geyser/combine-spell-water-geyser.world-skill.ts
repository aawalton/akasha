import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const combineSpellWaterGeyser = {
  id: "01a06575-97fc-7ecc-9ed0-340dde810114",
  type: "page-type/world-skill",
  slug: "combine-spell-water-geyser",
  title: "Combine Spell: Water Geyser",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
