import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const greatCourses = {
  id: "01a06579-f3d9-7008-be12-f37f13da607b",
  type: "domain",
  slug: "great-courses",
  definition: "the Great Courses catalogue, brought into the page store as a page for each course",
  parts: [
    "module/catalogue-syncing",
    "module/catalogue",
    "module/course-mapping",
    "module/course-types",
    "module/courses-query",
    "module/create-course",
    "module/page-query",
    "module/root-parent-query",
    "module/subject-collections-query",
    "module/sync",
    "module/sync-outcome",
    "module/sync-run",
    "service-workstation/great-courses-sync",
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
} as const satisfies Domain
