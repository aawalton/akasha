import type { Domain } from "../../../domains/domain.page-type.types.ts"
import type { Generator } from "./properties/generator.relation-property.ts"
import type { PropertySlug } from "./properties/property-slug.text-property.ts"
import type { Unique } from "./properties/unique.relation-property.ts"
import type { UniqueProperty } from "./properties/unique-property.relation-property.ts"

export type PageProperty = Domain & {
  propertySlug: PropertySlug
  generator?: Generator
  unique?: Unique
  uniqueProperty?: UniqueProperty
}
