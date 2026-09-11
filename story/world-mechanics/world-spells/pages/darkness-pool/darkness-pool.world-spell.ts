import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const darknessPool = {
  id: "01a06572-95bb-7bd6-a942-52cbd83ffbfc",
  type: "world-spell",
  slug: "darkness-pool",
  title: "Darkness Pool",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
