import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const day = {
  id: "01a05c77-31e4-7f97-8fe6-c273915285af",
  pageTypeSlug: "workspace-package",
  slug: "day",
  definition: "which day an instant falls on, where a day does not start at midnight",
  manifest: "json",
  partSlugs: [
    "module/day-string",
    "module/us-zone-offset",
    "module/eso-day",
    "module/new-york-wall",
    "module/mountain-day",
    "module/mountain-wall",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day is a dashed date rather than a Date.",
    },
    {
      invariantKind: "absence",
      statement: "No zone database is read.",
    },
  ],
} as const satisfies WorkspacePackage
