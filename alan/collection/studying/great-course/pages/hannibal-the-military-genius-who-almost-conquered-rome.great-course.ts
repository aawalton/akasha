import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const hannibalTheMilitaryGeniusWhoAlmostConqueredRome = {
  id: "019db533-f39f-7e82-afae-3e544484554c",
  type: "page-type/great-course",
  slug: "hannibal-the-military-genius-who-almost-conquered-rome",
  title: "Hannibal: The Military Genius Who Almost Conquered Rome",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 515.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "hannibal-the-military-genius-who-almost-conquered-rome",
      externalLink:
        "https://www.thegreatcoursesplus.com/hannibal-the-military-genius-who-almost-conquered-rome",
    },
  ],
} as const satisfies GreatCourse
