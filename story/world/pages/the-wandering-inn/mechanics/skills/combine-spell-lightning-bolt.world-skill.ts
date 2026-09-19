import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const combineSpellLightningBolt = {
  id: "01a06575-97fc-76d5-a1ec-e352935a06a8",
  type: "page-type/world-skill",
  slug: "combine-spell-lightning-bolt",
  title: "Combine Spell: Lightning Bolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
