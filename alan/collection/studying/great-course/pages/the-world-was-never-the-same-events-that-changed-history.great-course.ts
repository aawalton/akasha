import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theWorldWasNeverTheSameEventsThatChangedHistory = {
  id: "019db533-f3a0-7087-80c8-7cee7a7403e5",
  type: "page-type/great-course",
  slug: "the-world-was-never-the-same-events-that-changed-history",
  title: "The World Was Never the Same: Events That Changed History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1092,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-world-was-never-the-same-events-that-changed-history",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-world-was-never-the-same-events-that-changed-history",
    },
  ],
} as const satisfies GreatCourse
