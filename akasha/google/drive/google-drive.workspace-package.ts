import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const googleDrive = {
  id: "01a05bec-fc09-7a61-8e09-909bc24a66c2",
  pageTypeSlug: "workspace-package",
  slug: "google-drive",
  definition: "reading a file out of Alan's Google Drive",
  manifest: "json",
  partSlugs: [
    "module/drive-credentials",
    "module/drive-auth",
    "module/drive-client",
    "module/drive-file-schema",
    "module/drive-files",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here writes to Drive.",
    },
  ],
} as const satisfies WorkspacePackage
