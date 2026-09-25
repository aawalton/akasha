import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theMedievalWorld = {
  id: "019db533-f39f-7827-8da2-b9ea783d24c1",
  type: "page-type/great-course",
  slug: "the-medieval-world",
  title: "The Medieval World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1092.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-medieval-world",
      externalLink: "https://www.thegreatcoursesplus.com/the-medieval-world",
    },
  ],
} as const satisfies GreatCourse
