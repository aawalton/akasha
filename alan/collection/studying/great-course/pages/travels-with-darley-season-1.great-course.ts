import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const travelsWithDarleySeason1 = {
  id: "019db533-f39f-71ca-87ba-7fb83c620292",
  type: "page-type/great-course",
  slug: "travels-with-darley-season-1",
  title: "Travels with Darley – Season 1",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 321,
  ownProgress: 321,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "travels-with-darley-season-1",
      externalLink: "https://www.thegreatcoursesplus.com/travels-with-darley-season-1",
    },
  ],
} as const satisfies GreatCourse
