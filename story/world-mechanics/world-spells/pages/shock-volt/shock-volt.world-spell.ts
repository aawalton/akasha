import type { WorldSpell } from "../../world-spell.page-type.ts"

export const shockVolt = {
  id: "01a06572-95e0-72dc-b1fc-2287bc31022c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "shock-volt",
  title: "Shock Volt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
