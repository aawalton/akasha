import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const mudPit = {
  id: "01a06572-95d9-7b2e-bec4-9bf3175b67bd",
  type: "world-spell",
  slug: "mud-pit",
  title: "Mud Pit",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
