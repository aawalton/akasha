import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const greatCourses = {
  id: "01a06579-f3d9-7008-be12-f37f13da607b",
  type: "page-type/domain",
  slug: "great-courses",
  definition: "a page for each course from The Great Courses",
  parts: [
    "domain/the-great-courses",
    "module/catalogue",
    "module/catalogue-syncing",
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
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A course is written under the identifier the catalogue gave that course.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the catalogue the other way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is read over the network but the catalogue itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The collection is left alone where its root synced inside the last thirty days.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The workload running the sync is outside akasha.",
    },
  ],
} as const satisfies Domain
