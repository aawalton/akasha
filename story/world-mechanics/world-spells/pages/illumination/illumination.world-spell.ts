import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const illumination = {
  id: "01a06572-95cb-731e-a24a-a6b27740e61e",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "illumination",
  title: "Illumination",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
