import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const greatCourses = {
  id: "01a06579-f3d9-7008-be12-f37f13da607b",
  pageTypeSlug: "workspace-package",
  slug: "great-courses",
  definition: "the Great Courses catalogue, brought into the page store as a page for each course",
  manifest: "json",
  partSlugs: [
    "module/catalogue-syncing",
    "module/course-types",
    "module/page-query",
    "module/catalogue",
    "module/course-mapping",
    "module/courses-query",
    "module/subject-collections-query",
    "module/create-course",
    "module/root-parent-query",
    "module/sync-outcome",
    "module/sync-run",
    "module/sync",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A course is written under the identifier the catalogue gave that course.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the catalogue the other way.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is read over the network but the catalogue itself.",
    },
    {
      invariantKind: "departure",
      statement: "The collection is left alone where its root synced inside the last thirty days.",
    },
    {
      invariantKind: "departure",
      statement: "The workload running the sync is outside akasha.",
    },
  ],
} as const satisfies WorkspacePackage
