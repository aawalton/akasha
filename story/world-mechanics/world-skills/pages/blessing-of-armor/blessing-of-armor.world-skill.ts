import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const blessingOfArmor = {
  id: "01a06575-97f6-77c7-b707-eedb813cb99e",
  type: "world-skill",
  slug: "blessing-of-armor",
  title: "Blessing of Armor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
