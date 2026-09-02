import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const statusBarAccess = {
  id: "01a05c9d-4096-7000-9ca0-5ff9f4e38802",
  pageTypeSlug: "workspace-package",
  slug: "status-bar-access",
  definition: "a day's cardio reading, drawn from the health samples a watch recorded",
  manifest: "json",
  partSlugs: ["module/session-reading"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A caller states the day and the span the reading covers.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what a reading means or what color the reading draws.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the store itself.",
    },
  ],
} as const satisfies WorkspacePackage
