import type { PageProperty } from "../types/page-properties/page-property.page-type.types.ts"
import type { TargetPageType } from "./properties/target-page-type.relation-property.ts"

export type RelationProperty = PageProperty & {
  targetPageType: TargetPageType
}
