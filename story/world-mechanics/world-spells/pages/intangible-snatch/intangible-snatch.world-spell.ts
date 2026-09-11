import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const intangibleSnatch = {
  id: "01a06572-95cb-7e08-9ecf-53a85b0e77b6",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "intangible-snatch",
  title: "Intangible Snatch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
