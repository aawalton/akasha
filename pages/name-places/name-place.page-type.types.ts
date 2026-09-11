import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { NameFormat } from "akasha/pages/text-properties/properties/name-format.relation-property.types.ts"

export type NamePlace = Domain & {
  nameFormat: NameFormat
}
