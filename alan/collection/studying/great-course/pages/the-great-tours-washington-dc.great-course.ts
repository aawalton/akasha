import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatToursWashingtonDc = {
  id: "019db533-f39f-7499-a294-72c07472331e",
  type: "page-type/great-course",
  slug: "the-great-tours-washington-dc",
  title: "The Great Tours: Washington DC",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 994.2,
  ownProgress: 994.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-tours-washington-dc",
      externalLink: "https://www.thegreatcoursesplus.com/the-great-tours-washington-dc",
    },
  ],
} as const satisfies GreatCourse
