import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type WorkspaceManifest = "json"

export const workspaceManifest = {
  id: "01a06cbb-60a1-7753-bbdc-f8f50db94a79",
  pageTypeSlug: "named-file-property",
  slug: "workspace-manifest",
  propertySlug: "workspace-manifest",
  definition: "what a workspace states about itself",
  fileName: "package.json",
} as const satisfies NamedFileProperty
