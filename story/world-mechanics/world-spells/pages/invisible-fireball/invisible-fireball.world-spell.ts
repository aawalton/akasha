import type { WorldSpell } from "../../world-spell.page-type.ts"

export const invisibleFireball = {
  id: "01a06572-95cc-74d4-9eb5-93ab0902d74e",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "invisible-fireball",
  title: "Invisible Fireball",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
