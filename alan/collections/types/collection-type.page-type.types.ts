import type { CollectionUnit } from "akasha/alan/collections/properties/collection-unit.relation-property.types.ts"
import type { CollectionTypeStatus } from "akasha/alan/collections/types/properties/collection-type-status.select-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type CollectionType = Page & {
  title: Title
  unit: CollectionUnit
  collectionTypeStatus: CollectionTypeStatus
}
