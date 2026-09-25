import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const americaSGreatTrails = {
  id: "019db533-f39f-76c1-8c62-df2a0cafbb9f",
  type: "page-type/great-course",
  slug: "america-s-great-trails",
  title: "America’s Great Trails",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 161.4,
  ownProgress: 161.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "america-s-great-trails",
      externalLink: "https://www.thegreatcoursesplus.com/america-s-great-trails",
    },
  ],
} as const satisfies GreatCourse
