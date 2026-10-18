import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theArtOfConflictManagement = {
  id: "019db533-f39e-73f3-b5a2-cb0a434ee743",
  type: "page-type/great-course",
  slug: "the-art-of-conflict-management",
  title: "The Art of Conflict Management",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 743.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-art-of-conflict-management",
      externalLink: "https://plus.thegreatcourses.com/the-art-of-conflict-management",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
