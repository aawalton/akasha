import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const travelsWithDarleySeason2 = {
  id: "019db533-f39f-735c-9c32-0f716f1e851b",
  type: "page-type/great-course",
  slug: "travels-with-darley-season-2",
  title: "Travels with Darley – Season 2",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 272.4,
  ownProgress: 272.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "travels-with-darley-season-2",
      externalLink: "https://www.thegreatcoursesplus.com/travels-with-darley-season-2",
    },
  ],
} as const satisfies GreatCourse
