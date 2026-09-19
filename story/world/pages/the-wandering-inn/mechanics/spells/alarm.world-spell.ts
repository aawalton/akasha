import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const alarm = {
  id: "01a06572-95b3-7788-9cfc-3a9cfeaf75a4",
  type: "page-type/world-spell",
  slug: "alarm",
  title: "Alarm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
