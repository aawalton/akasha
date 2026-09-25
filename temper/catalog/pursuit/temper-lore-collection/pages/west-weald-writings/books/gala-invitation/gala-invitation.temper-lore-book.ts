import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const galaInvitation = {
  id: "01a0d60d-4aaf-7964-920b-fb63da05d41c",
  type: "page-type/temper-lore-book",
  slug: "gala-invitation",
  title: "Gala Invitation",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7880,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
