import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const durability = {
  id: "01a06572-95be-7cba-ad36-fb7ece9f87af",
  type: "page-type/world-spell",
  slug: "durability",
  title: "Durability",
  world: "world/the-wandering-inn",
} as const satisfies WorldSpell
