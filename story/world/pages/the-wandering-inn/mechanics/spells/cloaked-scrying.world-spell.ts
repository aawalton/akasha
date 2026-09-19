import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const cloakedScrying = {
  id: "01a06572-95b9-7800-99d3-df1d58e8d73d",
  type: "page-type/world-spell",
  slug: "cloaked-scrying",
  title: "Cloaked Scrying",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
