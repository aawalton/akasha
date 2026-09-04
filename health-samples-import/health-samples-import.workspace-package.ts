import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const healthSamplesImport = {
  id: "01a05c14-b11a-7006-9c17-e67776ab45af",
  pageTypeSlug: "workspace-package",
  slug: "health-samples-import",
  definition: "health readings taken off Alan's laptop and brought into the store",
  manifest: "json",
  partSlugs: [
    "module/verdict-reading",
    "module/health-export",
    "module/laptop-host",
    "module/export-fetching",
    "module/health-snapshot",
    "module/health-import",
    "module/health-import-checkpoint",
    "module/health-import-run",
    "module/health-import-reading",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A reading is fetched over a shell on the laptop rather than from anything the laptop serves.",
    },
    {
      invariantKind: "departure",
      statement: "An import that stops part way is resumed rather than started again.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what a reading means.",
    },
  ],
} as const satisfies WorkspacePackage
