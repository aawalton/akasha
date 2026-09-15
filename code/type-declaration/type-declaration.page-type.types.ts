import type { AmbientTypes } from "akasha/code/type-declaration/properties/ambient-types.file-property.types.ts"
import type { Generated } from "akasha/code/type-declaration/properties/generated.record-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type TypeDeclaration = Domain & {
  d: AmbientTypes
  generated?: Generated
}
