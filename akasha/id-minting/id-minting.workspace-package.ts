import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const idMinting = {
  id: "01a05c48-deeb-7011-83b1-73490aa9b3ca",
  pageTypeSlug: "workspace-package",
  slug: "id-minting",
  definition: "how a fresh identifier is made",
  manifest: "json",
  partSlugs: ["module/random-id"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here knows what an identifier this package makes will name.",
    },
  ],
} as const satisfies WorkspacePackage
