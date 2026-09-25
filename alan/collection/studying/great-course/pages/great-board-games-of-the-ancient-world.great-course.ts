import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatBoardGamesOfTheAncientWorld = {
  id: "019db533-f3a0-7487-bdd3-584c5e43448a",
  type: "page-type/great-course",
  slug: "great-board-games-of-the-ancient-world",
  title: "Great Board Games of the Ancient World",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 382.2,
  ownProgress: 382.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-board-games-of-the-ancient-world",
      externalLink: "https://www.thegreatcoursesplus.com/great-board-games-of-the-ancient-world",
    },
  ],
} as const satisfies GreatCourse
