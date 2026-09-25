import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noticeToAllResearchAssistants = {
  id: "01a0d5f4-3c12-7347-95f1-3cc35dba41bd",
  type: "page-type/temper-lore-book",
  slug: "notice-to-all-research-assistants",
  title: "Notice to All Research Assistants",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 4041,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
