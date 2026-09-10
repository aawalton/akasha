import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { Manifest } from "./properties/manifest.file-property.ts"
import type { ToolReached } from "./properties/tool-reached.text-property.ts"

export type WorkspacePackage = Domain & {
  manifest?: Manifest
  toolReached?: ToolReached
}
