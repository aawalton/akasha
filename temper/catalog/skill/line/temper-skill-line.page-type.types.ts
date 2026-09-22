import type { EsoSkillLineId } from "akasha/temper/catalog/skill/line/properties/eso-skill-line-id.number-property.types.ts"
import type { MaxRank } from "akasha/temper/catalog/skill/line/properties/max-rank.number-property.types.ts"
import type { SkillLineCategory } from "akasha/temper/catalog/skill/line/properties/skill-line-category.relation-property.types.ts"
import type { SkillLineClass } from "akasha/temper/catalog/skill/line/properties/skill-line-class.relation-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperSkillLine = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  esoSkillLineId: EsoSkillLineId
  maxRank: MaxRank
  class?: SkillLineClass
  category: SkillLineCategory
}
