import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatToursAfricanSafari = {
  id: "019db533-f39f-744f-8f4b-7065af9f6721",
  type: "page-type/great-course",
  slug: "the-great-tours-african-safari",
  title: "The Great Tours: African Safari",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 740.4,
  ownProgress: 740.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-tours-african-safari",
      externalLink: "https://www.thegreatcoursesplus.com/the-great-tours-african-safari",
    },
  ],
} as const satisfies GreatCourse
