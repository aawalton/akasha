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
      externalLink: "https://plus.thegreatcourses.com/america-s-great-trails",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
