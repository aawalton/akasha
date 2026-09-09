import type { WorldSpell } from "../../world-spell.page-type.ts"

export const lightBeam = {
  id: "01a06572-95ce-73b8-8f84-317061612465",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "light-beam",
  title: "Light Beam",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
