import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const orderOfTheEyeDispatch = {
  id: "01a0d5f3-0ef8-7f0c-9554-7313173a32ba",
  type: "page-type/temper-lore-book",
  slug: "order-of-the-eye-dispatch",
  title: "Order of the Eye Dispatch",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 4570,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
