import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { Generator } from "akasha/page/type/page-property/properties/generator.relation-property.types.ts"
import type { Nullable } from "akasha/page/type/page-property/properties/nullable.boolean-property.types.ts"
import type { PropertySlug } from "akasha/page/type/page-property/properties/property-slug.text-property.types.ts"
import type { Quoted } from "akasha/page/type/page-property/properties/quoted.boolean-property.types.ts"
import type { Unique } from "akasha/page/type/page-property/properties/unique.relation-property.types.ts"
import type { UniqueProperty } from "akasha/page/type/page-property/properties/unique-property.relation-property.types.ts"
import type { Types } from "akasha/page/type/properties/types.file-property.types.ts"

export type PageProperty = Domain & {
  propertySlug: PropertySlug
  generator?: Generator
  unique?: Unique
  uniqueProperty?: UniqueProperty
  types?: Types
  nullable?: Nullable
  quoted?: Quoted
}
