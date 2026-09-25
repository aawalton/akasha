import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersOfAssassination = {
  id: "01a0d60a-a214-763d-9a67-6f49a4015583",
  type: "page-type/temper-lore-book",
  slug: "orders-of-assassination",
  title: "Orders of Assassination",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4580,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
