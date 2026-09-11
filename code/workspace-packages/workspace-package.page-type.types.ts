import type { Manifest } from "akasha/code/workspace-packages/properties/manifest.file-property.types.ts"
import type { ToolReached } from "akasha/code/workspace-packages/properties/tool-reached.text-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type WorkspacePackage = Domain & {
  manifest?: Manifest
  toolReached?: ToolReached
}
