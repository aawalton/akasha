import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterLightningResistance = {
  id: "01a06575-9817-7796-b6c9-e09a6f29c801",
  type: "page-type/world-skill",
  slug: "greater-lightning-resistance",
  title: "Greater Lightning Resistance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
