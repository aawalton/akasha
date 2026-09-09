import type { WorldSpell } from "../../world-spell.page-type.ts"

export const farsight = {
  id: "01a06572-95c0-7b2e-a4d6-d4a2011675d9",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "farsight",
  title: "Farsight",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
