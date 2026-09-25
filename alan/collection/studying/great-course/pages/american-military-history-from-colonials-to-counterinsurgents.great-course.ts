import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const americanMilitaryHistoryFromColonialsToCounterinsurgents = {
  id: "019db533-f3a0-7154-adff-3606e3b664fc",
  type: "page-type/great-course",
  slug: "american-military-history-from-colonials-to-counterinsurgents",
  title: "American Military History: From Colonials to Counterinsurgents",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 696,
  ownProgress: 696,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "american-military-history-from-colonials-to-counterinsurgents",
      externalLink:
        "https://www.thegreatcoursesplus.com/american-military-history-from-colonials-to-counterinsurgents",
    },
  ],
} as const satisfies GreatCourse
