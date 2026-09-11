import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const workspaceManifest = {
  id: "01a06cbb-60a1-7753-bbdc-f8f50db94a79",
  type: "file-property",
  slug: "workspace-manifest",
  propertySlug: "workspace-manifest",
  definition: "what a workspace states about itself",
  extensions: ["json"],
  fileName: "package.json",
  toolResolvesPaths: true,
  types: "ts",
} as const satisfies FileProperty
