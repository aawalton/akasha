import type { WorldSpell } from "../../world-spell.page-type.ts"

export const thornArmor = {
  id: "01a06572-95e6-7762-a6e8-1c3cfe71eb2a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "thorn-armor",
  title: "Thorn Armor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
