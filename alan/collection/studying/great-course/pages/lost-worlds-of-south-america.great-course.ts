import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const lostWorldsOfSouthAmerica = {
  id: "019db533-f39f-7d25-a488-2ac80a066c04",
  type: "page-type/great-course",
  slug: "lost-worlds-of-south-america",
  title: "Lost Worlds of South America",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 714,
  ownProgress: 714,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "lost-worlds-of-south-america",
      externalLink: "https://www.thegreatcoursesplus.com/lost-worlds-of-south-america",
    },
  ],
} as const satisfies GreatCourse
