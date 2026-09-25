import type { EsoCollectionIndex } from "akasha/temper/catalog/pursuit/temper-lore-collection/properties/eso-collection-index.number-property.types.ts"
import type { EsoLoreCategoryId } from "akasha/temper/catalog/pursuit/temper-lore-collection/properties/eso-lore-category-id.number-property.types.ts"
import type { EsoLoreCollectionId } from "akasha/temper/catalog/pursuit/temper-lore-collection/properties/eso-lore-collection-id.number-property.types.ts"
import type { LoreCollectionBookTotal } from "akasha/temper/catalog/pursuit/temper-lore-collection/properties/lore-collection-book-total.number-property.types.ts"
import type { LoreCollectionDescription } from "akasha/temper/catalog/pursuit/temper-lore-collection/properties/lore-collection-description.text-property.types.ts"
import type { LoreCollectionGamepadIcon } from "akasha/temper/catalog/pursuit/temper-lore-collection/properties/lore-collection-gamepad-icon.text-property.types.ts"
import type { LoreCollectionHidden } from "akasha/temper/catalog/pursuit/temper-lore-collection/properties/lore-collection-hidden.boolean-property.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/pursuit/thing/temper-pursuit-thing.page-type.types.ts"

export type TemperLoreCollection = TemperPursuitThing & {
  esoLoreCategoryId: EsoLoreCategoryId
  esoCollectionIndex?: EsoCollectionIndex
  esoLoreCollectionId?: EsoLoreCollectionId
  loreCollectionDescription?: LoreCollectionDescription
  gamepadIcon?: LoreCollectionGamepadIcon
  hidden?: LoreCollectionHidden
  bookTotal?: LoreCollectionBookTotal
}
