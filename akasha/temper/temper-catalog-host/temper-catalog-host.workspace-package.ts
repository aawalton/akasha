import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperCatalogHost = {
  id: "01a06084-d41a-7744-abe5-6e332b80d93e",
  pageTypeSlug: "workspace-package",
  slug: "temper-catalog-host",
  definition: "what the catalog addon saved, read back as one summary for each account",
  manifest: "json",
  partSlugs: ["module/saved-variables-reader"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies WorkspacePackage
