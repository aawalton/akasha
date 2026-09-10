import type { Domain } from "../../../domains/domain.page-type.types.ts"
import type { Curation } from "./properties/curation.file-property.ts"
import type { Workspaces } from "./properties/workspaces.file-property.ts"

export type AstUnusedConfig = Domain & {
  workspaces?: Workspaces
  curation?: Curation
}
