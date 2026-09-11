import type { MaxLength } from "akasha/pages/types/page-properties/properties/max-length.number-property.types.ts"
import type { Unique } from "akasha/pages/types/page-properties/properties/unique.relation-property.types.ts"
import type { UniqueProperty } from "akasha/pages/types/page-properties/properties/unique-property.relation-property.types.ts"
import type { DefaultValue } from "akasha/pages/types/properties/default-value.text-property.types.ts"
import type { FixedValue } from "akasha/pages/types/properties/fixed-value.text-property.types.ts"
import type { OneValued } from "akasha/pages/types/properties/one-valued.false-property.types.ts"
import type { PageProperty } from "akasha/pages/types/properties/page-property.relation-property.types.ts"
import type { Required } from "akasha/pages/types/properties/required.boolean-property.types.ts"
import type { Secret } from "akasha/pages/types/properties/secret.boolean-property.types.ts"
import type { Uncommitted } from "akasha/pages/types/properties/uncommitted.boolean-property.types.ts"

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
