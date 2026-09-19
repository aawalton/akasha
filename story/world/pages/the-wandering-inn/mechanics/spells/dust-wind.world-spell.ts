import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const dustWind = {
  id: "01a06572-95be-79cc-bcc0-15ee7645b4b2",
  type: "page-type/world-spell",
  slug: "dust-wind",
  title: "Dust Wind",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
