import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { NameFormat } from "akasha/page/text-property/properties/name-format.relation-property.types.ts"

export type NamePlace = Domain & {
  nameFormat: NameFormat
}
