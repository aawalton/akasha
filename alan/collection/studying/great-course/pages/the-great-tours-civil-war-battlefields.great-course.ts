import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatToursCivilWarBattlefields = {
  id: "019db533-f39f-73db-bbf0-09bc8f9f7ee0",
  type: "page-type/great-course",
  slug: "the-great-tours-civil-war-battlefields",
  title: "The Great Tours: Civil War Battlefields",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 453,
  ownProgress: 453,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-tours-civil-war-battlefields",
      externalLink: "https://www.thegreatcoursesplus.com/the-great-tours-civil-war-battlefields",
    },
  ],
} as const satisfies GreatCourse
