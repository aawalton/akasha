import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const greenSerpentTestimonials = {
  id: "01a0d60c-75b5-7b71-ae93-736b839454fd",
  type: "page-type/temper-lore-book",
  slug: "green-serpent-testimonials",
  title: "Green Serpent Testimonials",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7123,
  bookIndex: 68,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
