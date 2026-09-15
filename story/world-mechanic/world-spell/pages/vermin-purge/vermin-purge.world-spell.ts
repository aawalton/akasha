import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const verminPurge = {
  id: "01a06572-95e8-7260-9715-75686754da02",
  type: "world-spell",
  slug: "vermin-purge",
  title: "Vermin Purge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
