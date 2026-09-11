import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stickyWebbing = {
  id: "01a06572-95e3-7444-84cc-4a3e9a76b92d",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "sticky-webbing",
  title: "Sticky Webbing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
