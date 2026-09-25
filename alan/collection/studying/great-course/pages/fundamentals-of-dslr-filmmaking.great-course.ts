import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const fundamentalsOfDslrFilmmaking = {
  id: "019db533-f39e-7322-b887-9a8be637a6ee",
  type: "page-type/great-course",
  slug: "fundamentals-of-dslr-filmmaking",
  title: "Fundamentals of DSLR Filmmaking",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 838.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "fundamentals-of-dslr-filmmaking",
      externalLink: "https://www.thegreatcoursesplus.com/fundamentals-of-dslr-filmmaking",
    },
  ],
} as const satisfies GreatCourse
