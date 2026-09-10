import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { CollectionUnit } from "../properties/collection-unit.relation-property.ts"
import type { CollectionTypeStatus } from "./properties/collection-type-status.select-property.ts"

export type CollectionType = Page & {
  title: Title
  unit: CollectionUnit
  collectionTypeStatus: CollectionTypeStatus
}
