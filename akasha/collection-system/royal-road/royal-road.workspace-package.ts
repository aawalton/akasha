import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const royalRoad = {
  id: "01a0657f-4492-7000-a3fc-56efd626beaa",
  pageTypeSlug: "workspace-package",
  slug: "royal-road",
  definition: "the pages Royal Road serves, read into fictions and chapters",
  partSlugs: ["module/royal-road-syncing"],
  manifest: "json",
  partSlugs: ["module/royal-road-pages"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
    {
      invariantKind: "departure",
      statement: "Every reach out to Royal Road goes through this package.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter is fetched without the account.",
    },
    {
      invariantKind: "departure",
      statement: "A story is synced where a story page names a Royal Road id.",
    },
    {
      invariantKind: "gap",
      statement: "A chapter read here is marked read on Royal Road.",
    },
  ],
} as const satisfies WorkspacePackage
