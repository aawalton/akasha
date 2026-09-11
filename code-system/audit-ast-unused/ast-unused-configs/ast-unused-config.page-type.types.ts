import type { Curation } from "akasha/code-system/audit-ast-unused/ast-unused-configs/properties/curation.file-property.ts"
import type { Workspaces } from "akasha/code-system/audit-ast-unused/ast-unused-configs/properties/workspaces.file-property.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type AstUnusedConfig = Domain & {
  workspaces?: Workspaces
  curation?: Curation
}
