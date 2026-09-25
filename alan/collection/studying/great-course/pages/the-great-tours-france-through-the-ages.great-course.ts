import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatToursFranceThroughTheAges = {
  id: "019db533-f39f-7cb0-8446-a2be4478088d",
  type: "page-type/great-course",
  slug: "the-great-tours-france-through-the-ages",
  title: "The Great Tours: France through the Ages",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 724.2,
  ownProgress: 724.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-tours-france-through-the-ages",
      externalLink: "https://www.thegreatcoursesplus.com/the-great-tours-france-through-the-ages",
    },
  ],
} as const satisfies GreatCourse
