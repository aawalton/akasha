import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howGreatScienceFictionWorks = {
  id: "019db533-f39e-7864-92b8-0d27b34e5470",
  type: "page-type/great-course",
  slug: "how-great-science-fiction-works",
  title: "How Great Science Fiction Works",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 755.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-great-science-fiction-works",
      externalLink: "https://plus.thegreatcourses.com/how-great-science-fiction-works",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
