import type { Curation } from "akasha/code/audit-ast-unused/ast-unused-configs/properties/curation.file-property.types.ts"
import type { Workspaces } from "akasha/code/audit-ast-unused/ast-unused-configs/properties/workspaces.file-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type AstUnusedConfig = Domain & {
  workspaces?: Workspaces
  curation?: Curation
}
