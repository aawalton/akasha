import type { CollectionUnit } from "akasha/alan/collection/properties/collection-unit.relation-property.types.ts"
import type { CollectionTypeStatus } from "akasha/alan/collection/type/properties/collection-type-status.select-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type CollectionType = Page & {
  title: Title
  unit: CollectionUnit
  collectionTypeStatus: CollectionTypeStatus
}
