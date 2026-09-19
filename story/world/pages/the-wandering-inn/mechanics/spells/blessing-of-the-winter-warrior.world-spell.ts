import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const blessingOfTheWinterWarrior = {
  id: "01a06572-95b6-7a24-b78c-b38b8895930c",
  type: "page-type/world-spell",
  slug: "blessing-of-the-winter-warrior",
  title: "Blessing of the Winter Warrior",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
