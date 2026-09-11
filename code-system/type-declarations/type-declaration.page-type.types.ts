import type { AmbientTypes } from "akasha/code-system/type-declarations/properties/ambient-types.file-property.types.ts"
import type { Generated } from "akasha/code-system/type-declarations/properties/generated.record-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type TypeDeclaration = Domain & {
  d: AmbientTypes
  generated?: Generated
}
