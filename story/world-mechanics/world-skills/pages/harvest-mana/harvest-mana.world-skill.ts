import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const harvestMana = {
  id: "01a06575-9818-7e0c-a837-97ed43e259df",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "harvest-mana",
  title: "Harvest Mana",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
