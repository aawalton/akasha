import type { TemperCompanionThing } from "akasha/temper/catalog/companion/thing/temper-companion-thing.page-type.types.ts"
import type { Category } from "akasha/temper/thing/properties/category.text-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCompanionSkillLine = TemperCompanionThing & {
  key: Key
  category: Category
  displayOrder: DisplayOrder
}
