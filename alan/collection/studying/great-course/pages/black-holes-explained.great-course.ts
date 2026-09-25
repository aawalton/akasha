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
      externalLink: "https://www.thegreatcoursesplus.com/black-holes-explained",
    },
  ],
} as const satisfies GreatCourse
