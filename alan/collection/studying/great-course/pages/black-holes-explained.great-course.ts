import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const blackHolesExplained = {
  id: "019db533-f39f-7332-a5a8-086a1aafc356",
  type: "page-type/great-course",
  slug: "black-holes-explained",
  title: "Black Holes Explained",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 384.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "black-holes-explained",
      externalLink: "https://plus.thegreatcourses.com/black-holes-explained",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
