import type { Domain } from "../../domains/domain.page-type.ts"
import type { NameFormat } from "../text-properties/properties/name-format.relation-property.ts"

export type NamePlace = Domain & {
  nameFormat: NameFormat
}
