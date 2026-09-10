import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { DockerfileExtensions } from "./properties/dockerfile-extensions.file-property.ts"
import type { Manifest } from "./properties/manifest.file-property.ts"
import type { ToolReached } from "./properties/tool-reached.text-property.ts"
import type { TunnelRoutes } from "./properties/tunnel-routes.code-file-property.ts"

export type WorkspacePackage = Domain & {
  manifest: Manifest
  tunnelRoutes?: TunnelRoutes
  dockerfileExtensions?: DockerfileExtensions
  toolReached?: ToolReached
}
