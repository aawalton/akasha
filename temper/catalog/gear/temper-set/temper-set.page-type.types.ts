import type { Bonuses } from "akasha/temper/catalog/gear/temper-set/properties/bonuses.page-property-entry.types.ts"
import type { EsoSetId } from "akasha/temper/catalog/gear/temper-set/properties/eso-set-id.number-property.types.ts"
import type { Icons } from "akasha/temper/catalog/gear/temper-set/properties/icons.page-property-entry.types.ts"
import type { SetCategory } from "akasha/temper/catalog/gear/temper-set/properties/set-category.relation-property.types.ts"
import type { SetClassId } from "akasha/temper/catalog/gear/temper-set/properties/set-class-id.relation-property.types.ts"
import type { ValidPieces } from "akasha/temper/catalog/gear/temper-set/properties/valid-pieces.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperSet = TemperCatalogThing & {
  key: Key
  esoSetId: EsoSetId
  bonuses: Bonuses
  icons: Icons
  valid: ValidPieces
  classId?: SetClassId
  category: SetCategory
}
