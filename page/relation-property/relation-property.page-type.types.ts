import type { TargetPageType } from "akasha/page/relation-property/properties/target-page-type.relation-property.types.ts"
import type { PageProperty } from "akasha/page/type/page-property/page-property.page-type.types.ts"

export type RelationProperty = PageProperty & {
  targetPageType: TargetPageType
}
