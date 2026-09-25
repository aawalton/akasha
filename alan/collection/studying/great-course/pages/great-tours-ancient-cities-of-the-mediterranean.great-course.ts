import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatToursAncientCitiesOfTheMediterranean = {
  id: "019db533-f39f-764a-9aff-7160d48f4e5f",
  type: "page-type/great-course",
  slug: "great-tours-ancient-cities-of-the-mediterranean",
  title: "Great Tours: Ancient Cities of the Mediterranean",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 701.4,
  ownProgress: 701.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-tours-ancient-cities-of-the-mediterranean",
      externalLink:
        "https://www.thegreatcoursesplus.com/great-tours-ancient-cities-of-the-mediterranean",
    },
  ],
} as const satisfies GreatCourse
