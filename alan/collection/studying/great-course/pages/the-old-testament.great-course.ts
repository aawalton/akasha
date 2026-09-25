import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theOldTestament = {
  id: "019db533-f39e-7a0c-827f-e8b3b047d071",
  type: "page-type/great-course",
  slug: "the-old-testament",
  title: "The Old Testament",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 723.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-old-testament",
      externalLink: "https://www.thegreatcoursesplus.com/the-old-testament",
    },
  ],
} as const satisfies GreatCourse
