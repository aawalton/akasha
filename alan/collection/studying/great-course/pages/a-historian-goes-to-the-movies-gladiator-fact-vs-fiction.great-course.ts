import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const aHistorianGoesToTheMoviesGladiatorFactVsFiction = {
  id: "019db533-f3a0-71b9-b790-36a41739aa88",
  type: "page-type/great-course",
  slug: "a-historian-goes-to-the-movies-gladiator-fact-vs-fiction",
  title: "A Historian Goes to the Movies: Gladiator Fact vs. Fiction",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 42.6,
  ownProgress: 42.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "a-historian-goes-to-the-movies-gladiator-fact-or-fiction",
      externalLink:
        "https://www.thegreatcoursesplus.com/a-historian-goes-to-the-movies-gladiator-fact-or-fiction",
    },
  ],
} as const satisfies GreatCourse
