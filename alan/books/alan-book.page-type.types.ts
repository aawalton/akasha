import type { Collection } from "akasha/alan/collections/collection.page-type.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type AlanBook = Collection &
  Domain & {
    title: Title
  }
