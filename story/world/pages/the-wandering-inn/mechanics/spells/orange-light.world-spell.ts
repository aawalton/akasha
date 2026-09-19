import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const orangeLight = {
  id: "01a06572-95da-7103-b3bd-7c82051a6212",
  type: "page-type/world-spell",
  slug: "orange-light",
  title: "Orange Light",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
