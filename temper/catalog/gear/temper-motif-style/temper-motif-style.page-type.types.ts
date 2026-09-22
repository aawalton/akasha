import type { CollectionIndex } from "akasha/temper/catalog/gear/temper-motif-style/properties/collection-index.number-property.types.ts"
import type { DropSources } from "akasha/temper/catalog/gear/temper-motif-style/properties/drop-sources.multi-relation-property.types.ts"
import type { SourceDescription } from "akasha/temper/catalog/gear/temper-motif-style/properties/source-description.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"

export type TemperMotifStyle = TemperCatalogThing & {
  collectionIndex: CollectionIndex
  sourceDescription: SourceDescription
  dropSources?: DropSources
}
