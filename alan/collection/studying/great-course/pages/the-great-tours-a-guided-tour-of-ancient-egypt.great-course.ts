import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatToursAGuidedTourOfAncientEgypt = {
  id: "019db533-f39f-77e7-864e-aae7f77f86ad",
  type: "page-type/great-course",
  slug: "the-great-tours-a-guided-tour-of-ancient-egypt",
  title: "The Great Tours: A Guided Tour of Ancient Egypt",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 695.4,
  ownProgress: 695.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-tours-a-guided-tour-of-ancient-egypt",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-great-tours-a-guided-tour-of-ancient-egypt",
    },
  ],
} as const satisfies GreatCourse
