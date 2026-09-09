import type { WorldSpell } from "../../world-spell.page-type.ts"

export const reducedSpellFireball = {
  id: "01a06572-95dc-7cca-9472-02487f578a9f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "reduced-spell-fireball",
  title: "Reduced Spell: Fireball",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
