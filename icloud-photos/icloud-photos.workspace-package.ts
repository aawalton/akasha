import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const icloudPhotos = {
  id: "01a06585-5f39-7952-9837-205f11953eba",
  pageTypeSlug: "workspace-package",
  slug: "icloud-photos",
  definition: "the photos an iCloud shared album holds, read out of Apple's CloudKit",
  manifest: "json",
  partSlugs: ["module/album-pulling"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here makes a request.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file.",
    },
    {
      invariantKind: "departure",
      statement: "An album is reached by a public token rather than by an account.",
    },
  ],
} as const satisfies WorkspacePackage
