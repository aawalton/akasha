import type { CollectionUnit } from "akasha/alan/collections/properties/collection-unit.relation-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { Description } from "akasha/pages/properties/description.text-property.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type AlanBook = Domain & {
  title: Title
  description?: Description
  unit?: CollectionUnit
}
