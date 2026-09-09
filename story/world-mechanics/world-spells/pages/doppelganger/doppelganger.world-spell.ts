import type { WorldSpell } from "../../world-spell.page-type.ts"

export const doppelganger = {
  id: "01a06572-95be-703c-b47c-8e36590e9b5b",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "doppelganger",
  title: "Doppelganger",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
