import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const worldWarIiThePacificTheater = {
  id: "019db533-f39f-7fad-b129-7122e1df85a3",
  type: "page-type/great-course",
  slug: "world-war-ii-the-pacific-theater",
  title: "World War II: The Pacific Theater",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 749.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "world-war-ii-the-pacific-theater-8756",
      externalLink: "https://www.thegreatcoursesplus.com/world-war-ii-the-pacific-theater-8756",
    },
  ],
} as const satisfies GreatCourse
