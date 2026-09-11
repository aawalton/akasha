import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const dustWind = {
  id: "01a06572-95be-79cc-bcc0-15ee7645b4b2",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "dust-wind",
  title: "Dust Wind",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
