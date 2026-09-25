import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const experiencingAmericaASmithsonianTourThroughAmericanHistory = {
  id: "019db533-f3a0-7184-911a-33f69dadd579",
  type: "page-type/great-course",
  slug: "experiencing-america-a-smithsonian-tour-through-american-history",
  title: "Experiencing America: A Smithsonian Tour through American History",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 777,
  ownProgress: 777,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "experiencing-america-a-smithsonian-tour-through-american-history",
      externalLink:
        "https://www.thegreatcoursesplus.com/experiencing-america-a-smithsonian-tour-through-american-history",
    },
  ],
} as const satisfies GreatCourse
