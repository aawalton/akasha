import type { AchievementCategoryParent } from "akasha/temper/catalog/pursuit/temper-achievement-category/properties/achievement-category-parent.relation-property.types.ts"
import type { Achievements } from "akasha/temper/catalog/pursuit/temper-achievement-category/properties/achievements.page-property-entry.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/pursuit/thing/temper-pursuit-thing.page-type.types.ts"
import type { Category } from "akasha/temper/thing/properties/category.text-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"

export type TemperAchievementCategory = TemperPursuitThing & {
  category: Category
  displayOrder: DisplayOrder
  achievements?: Achievements
  parent?: AchievementCategoryParent
}
