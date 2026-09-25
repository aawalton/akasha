import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rememberMe = {
  id: "01a0d5e3-4278-7b1c-9a8d-6d41b393d5d9",
  type: "page-type/temper-lore-book",
  slug: "remember-me",
  title: "Remember Me",
  collection: "temper-lore-collection/shadowfen-lore",
  bookIndex: 4,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
