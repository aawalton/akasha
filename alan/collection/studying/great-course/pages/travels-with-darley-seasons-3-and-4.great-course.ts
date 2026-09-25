import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const travelsWithDarleySeasons3And4 = {
  id: "019db533-f39f-7391-ae3c-30b2d06d94ff",
  type: "page-type/great-course",
  slug: "travels-with-darley-seasons-3-and-4",
  title: "Travels with Darley: Seasons 3 & 4",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 668.4,
  ownProgress: 668.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "travels-with-darley-seasons-3-4",
      externalLink: "https://www.thegreatcoursesplus.com/travels-with-darley-seasons-3-4",
    },
  ],
} as const satisfies GreatCourse
