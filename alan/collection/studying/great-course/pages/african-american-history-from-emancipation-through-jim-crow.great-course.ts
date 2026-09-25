import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const africanAmericanHistoryFromEmancipationThroughJimCrow = {
  id: "019db533-f3a0-75aa-b3c6-96672b368224",
  type: "page-type/great-course",
  slug: "african-american-history-from-emancipation-through-jim-crow",
  title: "African American History: From Emancipation through Jim Crow",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 418.8,
  ownProgress: 418.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "african-american-history-from-emancipation-through-jim-crow",
      externalLink:
        "https://www.thegreatcoursesplus.com/african-american-history-from-emancipation-through-jim-crow",
    },
  ],
} as const satisfies GreatCourse
