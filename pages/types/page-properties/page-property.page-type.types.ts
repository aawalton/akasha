import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { Generator } from "akasha/pages/types/page-properties/properties/generator.relation-property.types.ts"
import type { Nullable } from "akasha/pages/types/page-properties/properties/nullable.boolean-property.types.ts"
import type { PropertySlug } from "akasha/pages/types/page-properties/properties/property-slug.text-property.types.ts"
import type { Unique } from "akasha/pages/types/page-properties/properties/unique.relation-property.types.ts"
import type { UniqueProperty } from "akasha/pages/types/page-properties/properties/unique-property.relation-property.types.ts"
import type { Types } from "akasha/pages/types/properties/types.file-property.ts"

export type PageProperty = Domain & {
  propertySlug: PropertySlug
  generator?: Generator
  unique?: Unique
  uniqueProperty?: UniqueProperty
  types?: Types
  nullable?: Nullable
}
