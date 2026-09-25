import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const researchAssistantRequired = {
  id: "01a0d60c-18bd-7d7b-9cff-7f5a7d501bc0",
  type: "page-type/temper-lore-book",
  slug: "research-assistant-required",
  title: "Research Assistant Required!",
  collection: "temper-lore-collection/the-impresarios-catalogue",
  bookIndex: 17,
} as const satisfies TemperLoreBook
