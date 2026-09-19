import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stickyWebbing = {
  id: "01a06572-95e3-7444-84cc-4a3e9a76b92d",
  type: "page-type/world-spell",
  slug: "sticky-webbing",
  title: "Sticky Webbing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
