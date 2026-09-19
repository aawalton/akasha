import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const homingFireball = {
  id: "01a06572-95c8-7593-8b20-5539b8de1839",
  type: "page-type/world-spell",
  slug: "homing-fireball",
  title: "Homing Fireball",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
