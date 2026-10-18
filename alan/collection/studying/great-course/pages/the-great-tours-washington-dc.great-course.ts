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
      externalLink: "https://plus.thegreatcourses.com/the-great-tours-washington-dc",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
