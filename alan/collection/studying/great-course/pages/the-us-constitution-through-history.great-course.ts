import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theUsConstitutionThroughHistory = {
  id: "019db533-f39f-7f82-b63d-2d90184d0923",
  type: "page-type/great-course",
  slug: "the-us-constitution-through-history",
  title: "The US Constitution through History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 856.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-us-constitution-through-history",
      externalLink: "https://www.thegreatcoursesplus.com/the-us-constitution-through-history",
    },
  ],
} as const satisfies GreatCourse
