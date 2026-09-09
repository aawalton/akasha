import type { WorldSpell } from "../../world-spell.page-type.ts"

export const deafen = {
  id: "01a06572-95bb-71cf-a997-a953eef042e3",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "deafen",
  title: "Deafen",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
