import type { WorldSpell } from "../../world-spell.page-type.ts"

export const frozenWind = {
  id: "01a06572-95c6-76b2-b972-54a3bdd4316f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "frozen-wind",
  title: "Frozen Wind",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
