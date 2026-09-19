import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stickyWebWallOfBinding = {
  id: "01a06572-95e3-7e4c-be07-39730c0078b2",
  type: "page-type/world-spell",
  slug: "sticky-web-wall-of-binding",
  title: "Sticky Web: Wall of Binding",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
