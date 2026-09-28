import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const otherwhereShelfSight = {
  id: "01a0e7da-4cd6-7933-8410-b02405d93c50",
  type: "page-type/world-spell",
  slug: "otherwhere-shelf-sight",
  title: "Shelf Sight",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  description:
    "Nala's Shelf Sight, learned from the Library's book of that name: opening it costs 1 mana, and for an hour after, one glance at a book shows her the shelf it belongs on. With it open, sorting a section at a time, she reshelves some thirty books an hour.",
} as const satisfies WorldSpell
