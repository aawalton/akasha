import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { BookName } from "akasha/temper/catalog/pursuit/temper-lore-collection/properties/book-name.text-property.types.ts"
import type { BookIndex } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/book-index.number-property.types.ts"

export type Books = "jsonl"

export type BooksRow = {
  id: Id
  bookIndex: BookIndex
  bookName: BookName
}
