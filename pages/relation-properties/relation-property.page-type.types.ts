import type { TargetPageType } from "akasha/pages/relation-properties/properties/target-page-type.relation-property.types.ts"
import type { PageProperty } from "akasha/pages/types/page-properties/page-property.page-type.types.ts"

export type RelationProperty = PageProperty & {
  targetPageType: TargetPageType
}
