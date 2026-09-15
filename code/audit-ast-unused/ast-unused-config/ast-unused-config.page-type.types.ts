import type { Curation } from "akasha/code/audit-ast-unused/ast-unused-config/properties/curation.file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type AstUnusedConfig = Domain & {
  curation?: Curation
}
