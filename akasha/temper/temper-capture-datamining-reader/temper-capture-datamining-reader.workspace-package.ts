import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperCaptureDataminingReader = {
  id: "01a0609d-90dd-75fe-af4b-e55cf72da4b3",
  pageTypeSlug: "workspace-package",
  slug: "temper-capture-datamining-reader",
  definition: "what the datamining addon wrote out, read back and checked",
  manifest: "json",
  partSlugs: ["module/mined-data-parse", "module/saved-variables-schema"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A datamining capture is checked against a zod shape before any reader reads that capture.",
    },
    {
      invariantKind: "absence",
      statement: "No datamining capture is written here.",
    },
  ],
} as const satisfies WorkspacePackage
