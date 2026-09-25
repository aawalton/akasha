import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatMindsOfTheMedievalWorld = {
  id: "019db533-f3a0-7171-bdaa-3a1b9af26f2a",
  type: "page-type/great-course",
  slug: "great-minds-of-the-medieval-world",
  title: "Great Minds of the Medieval World",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 722.4,
  ownProgress: 722.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-minds-of-the-medieval-world",
      externalLink: "https://www.thegreatcoursesplus.com/great-minds-of-the-medieval-world",
    },
  ],
} as const satisfies GreatCourse
