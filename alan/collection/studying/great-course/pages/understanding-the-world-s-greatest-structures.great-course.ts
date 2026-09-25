import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheWorldSGreatestStructures = {
  id: "019db533-f39f-7b5e-b9bf-ff972673d9d8",
  type: "page-type/great-course",
  slug: "understanding-the-world-s-greatest-structures",
  title: "Understanding the World's Greatest Structures",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 765.6,
  ownProgress: 765.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/science-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-worlds-greatest-structures",
      externalLink:
        "https://www.thegreatcoursesplus.com/understanding-the-worlds-greatest-structures",
    },
  ],
} as const satisfies GreatCourse
