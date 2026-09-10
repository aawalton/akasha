import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { AmbientTypes } from "./properties/ambient-types.file-property.ts"
import type { Generated } from "./properties/generated.record-property.ts"

export type TypeDeclaration = Domain & {
  d: AmbientTypes
  generated?: Generated
}
