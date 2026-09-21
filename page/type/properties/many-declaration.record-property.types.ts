import type { MaxCount } from "akasha/page/type/page-property/properties/max-count.number-property.types.ts"
import type { MaxLength } from "akasha/page/type/page-property/properties/max-length.number-property.types.ts"
import type { Unique } from "akasha/page/type/page-property/properties/unique.relation-property.types.ts"
import type { UniqueProperty } from "akasha/page/type/page-property/properties/unique-property.relation-property.types.ts"
import type { ListRepeats } from "akasha/page/type/properties/list-repeats.boolean-property.types.ts"
import type { ManyValued } from "akasha/page/type/properties/many-valued.true-property.types.ts"
import type { PageProperty } from "akasha/page/type/properties/page-property.relation-property.types.ts"
import type { Required } from "akasha/page/type/properties/required.boolean-property.types.ts"
import type { Secret } from "akasha/page/type/properties/secret.boolean-property.types.ts"
import type { Uncommitted } from "akasha/page/type/properties/uncommitted.boolean-property.types.ts"

export type ManyDeclaration = {
  pageProperty: PageProperty
  required: Required
  many: ManyValued
  maxCount: MaxCount
  maxLength?: MaxLength
  uncommitted?: Uncommitted
  secret?: Secret
  unique?: Unique
  uniqueProperty?: UniqueProperty
  repeats?: ListRepeats
}
