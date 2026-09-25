import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anInvitationToElsweyr = {
  id: "01a0d60c-18bc-7291-87f2-9b7f109bb2c1",
  type: "page-type/temper-lore-book",
  slug: "an-invitation-to-elsweyr",
  title: "An Invitation to Elsweyr",
  collection: "temper-lore-collection/the-impresarios-catalogue",
  esoBookId: 6493,
  bookIndex: 1,
  charted: false,
} as const satisfies TemperLoreBook
