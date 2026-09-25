import type { MaxLength } from "akasha/page/type/page-property/properties/max-length.number-property.types.ts"
import type { Unique } from "akasha/page/type/page-property/properties/unique.relation-property.types.ts"
import type { UniqueProperty } from "akasha/page/type/page-property/properties/unique-property.relation-property.types.ts"
import type { DefaultValue } from "akasha/page/type/properties/default-value.one-of-property.types.ts"
import type { FixedValue } from "akasha/page/type/properties/fixed-value.text-property.types.ts"
import type { OneValued } from "akasha/page/type/properties/one-valued.false-property.types.ts"
import type { PageProperty } from "akasha/page/type/properties/page-property.relation-property.types.ts"
import type { Required } from "akasha/page/type/properties/required.boolean-property.types.ts"
import type { Secret } from "akasha/page/type/properties/secret.boolean-property.types.ts"
import type { Uncommitted } from "akasha/page/type/properties/uncommitted.boolean-property.types.ts"

export type SingleDeclaration = {
  pageProperty: PageProperty
  required: Required
  many: OneValued
  default?: DefaultValue
  fixed?: FixedValue
  maxLength?: MaxLength
  uncommitted?: Uncommitted
  secret?: Secret
  unique?: Unique
  uniqueProperty?: UniqueProperty
}
