import type { WorldSpell } from "../../world-spell.page-type.ts"

export const galeWinds = {
  id: "01a06572-95c6-7e6e-9403-a33d7ca068ee",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "gale-winds",
  title: "Gale Winds",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
