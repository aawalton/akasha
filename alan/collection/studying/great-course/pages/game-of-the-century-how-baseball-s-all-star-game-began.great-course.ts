import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const gameOfTheCenturyHowBaseballSAllStarGameBegan = {
  id: "019db533-f3a0-7493-94d0-c3b5fee67336",
  type: "page-type/great-course",
  slug: "game-of-the-century-how-baseball-s-all-star-game-began",
  title: "Game of the Century: How Baseball's All-Star Game Began",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 12.6,
  ownProgress: 12.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "game-of-the-century-how-baseballs-all-star-game-began",
      externalLink:
        "https://www.thegreatcoursesplus.com/game-of-the-century-how-baseballs-all-star-game-began",
    },
  ],
} as const satisfies GreatCourse
