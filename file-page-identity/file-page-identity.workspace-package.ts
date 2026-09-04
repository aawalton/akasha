import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const filePageIdentity = {
  id: "01a05c69-e870-7637-b745-5f768a4c4a67",
  pageTypeSlug: "workspace-package",
  slug: "file-page-identity",
  definition: "what a page kept in a file is known by",
  manifest: "json",
  partSlugs: ["module/file-page", "module/sha1-digest"],
} as const satisfies WorkspacePackage
