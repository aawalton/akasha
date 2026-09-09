import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const idMinting = {
  id: "01a05c48-deeb-7011-83b1-73490aa9b3ca",
  pageTypeSlug: "workspace-package",
  slug: "id-minting",
  definition: "how a fresh identifier is made",
  manifest: "json",
  parts: ["module/random-id", "module/uuid-version-7"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here knows the thing an identifier this package makes will name.",
    },
  ],
} as const satisfies WorkspacePackage
