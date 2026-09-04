import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const healthSamplesDay = {
  id: "01a05bc7-9129-7007-82af-fd4145203797",
  pageTypeSlug: "workspace-package",
  slug: "health-samples-day",
  definition: "a day's health readings, counted from the moment Alan woke",
  manifest: "json",
  partSlugs: ["module/wake-day-window", "module/active-calories"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here writes a reading down.",
    },
    {
      invariantKind: "departure",
      statement: "A day's sleep is read from the entries beside that day's page.",
    },
    {
      invariantKind: "departure",
      statement: "A day whose sleep was never recorded is refused rather than given a window.",
    },
  ],
} as const satisfies WorkspacePackage
