import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const pathOfVines = {
  id: "01a06572-95da-7d4c-971a-032dcb51ca5d",
  type: "page-type/world-spell",
  slug: "path-of-vines",
  title: "Path of…Vines",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
