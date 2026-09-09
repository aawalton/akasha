import type { WorldSpell } from "../../world-spell.page-type.ts"

export const flameGeyser = {
  id: "01a06572-95c3-7bdc-b787-ae0d59b8f7c6",
  pageTypeSlug: "world-spell",
  slug: "flame-geyser",
  title: "Flame Geyser",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
