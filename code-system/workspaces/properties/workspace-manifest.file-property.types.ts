import type { workspaceManifest } from "akasha/code-system/workspaces/properties/workspace-manifest.file-property.ts"

export type WorkspaceManifest = (typeof workspaceManifest.extensions)[number]
