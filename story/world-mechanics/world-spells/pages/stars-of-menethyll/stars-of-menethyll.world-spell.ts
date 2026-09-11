import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const starsOfMenethyll = {
  id: "01a06572-95e2-726d-b74d-85fc6f788ff5",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "stars-of-menethyll",
  title: "Stars of Menethyll",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
