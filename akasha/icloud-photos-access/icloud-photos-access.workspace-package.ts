import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const icloudPhotosAccess = {
  id: "01a06553-a9b6-7cd0-a194-cb4f8eba83b8",
  pageTypeSlug: "workspace-package",
  slug: "icloud-photos-access",
  definition: "how the photos of a shared iCloud album are reached",
  manifest: "json",
  partSlugs: ["module/icloud-share"],
} as const satisfies WorkspacePackage
