import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const historySGreatMilitaryBlundersAndTheLessonsTheyTeach = {
  id: "019db533-f3a0-7140-81c3-68fc0f83f725",
  type: "page-type/great-course",
  slug: "history-s-great-military-blunders-and-the-lessons-they-teach",
  title: "History's Great Military Blunders and the Lessons They Teach",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 735,
  ownProgress: 735,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "historys-great-military-blunders-and-the-lessons-they-teach",
      externalLink:
        "https://www.thegreatcoursesplus.com/historys-great-military-blunders-and-the-lessons-they-teach",
    },
  ],
} as const satisfies GreatCourse
