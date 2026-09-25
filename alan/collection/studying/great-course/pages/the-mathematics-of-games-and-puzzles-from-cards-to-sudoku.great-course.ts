import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theMathematicsOfGamesAndPuzzlesFromCardsToSudoku = {
  id: "019db533-f3a0-7673-9676-670784b3a5bc",
  type: "page-type/great-course",
  slug: "the-mathematics-of-games-and-puzzles-from-cards-to-sudoku",
  title: "The Mathematics of Games and Puzzles: From Cards to Sudoku",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 544.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-mathematics-of-games-and-puzzles-from-cards-to-sudoku",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-mathematics-of-games-and-puzzles-from-cards-to-sudoku",
    },
  ],
} as const satisfies GreatCourse
