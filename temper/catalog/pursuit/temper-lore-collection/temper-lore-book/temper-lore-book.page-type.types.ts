import type { BookIndex } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/book-index.number-property.types.ts"
import type { EsoBookId } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/eso-book-id.number-property.types.ts"
import type { LoreBookCharted } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-book-charted.boolean-property.types.ts"
import type { LoreBookCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-book-collection.relation-property.types.ts"
import type { LoreBookKeyed } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-book-keyed.boolean-property.types.ts"
import type { LoreBookL } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-book-l.boolean-property.types.ts"
import type { LoreBookMapCounts } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-book-map-counts.record-property.types.ts"
import type { LoreBookNumberedTitle } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-book-numbered-title.number-property.types.ts"
import type { LoreBookOnBookshelves } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-book-on-bookshelves.boolean-property.types.ts"
import type { LoreBookPositions } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-book-positions.page-property-entry.types.ts"
import type { LoreBookQuest } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-book-quest.number-property.types.ts"
import type { ShalidorPins } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/shalidor-pins.page-property-entry.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/pursuit/thing/temper-pursuit-thing.page-type.types.ts"

export type TemperLoreBook = TemperPursuitThing & {
  collection?: LoreBookCollection
  esoBookId?: EsoBookId
  bookIndex?: BookIndex
  numberedTitle?: LoreBookNumberedTitle
  charted?: LoreBookCharted
  onBookshelves?: LoreBookOnBookshelves
  quest?: LoreBookQuest
  keyed?: LoreBookKeyed
  loreBooksL?: LoreBookL
  mapCounts?: LoreBookMapCounts
  positions?: LoreBookPositions
  shalidorPins?: ShalidorPins
}
