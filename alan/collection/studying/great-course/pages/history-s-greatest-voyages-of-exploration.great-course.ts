import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const historySGreatestVoyagesOfExploration = {
  id: "019db533-f3a0-73a8-b072-9bfc942a0a19",
  type: "page-type/great-course",
  slug: "history-s-greatest-voyages-of-exploration",
  title: "History's Greatest Voyages of Exploration",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 724.2,
  ownProgress: 724.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "historys-greatest-voyages-of-exploration",
      externalLink: "https://www.thegreatcoursesplus.com/historys-greatest-voyages-of-exploration",
    },
  ],
} as const satisfies GreatCourse
