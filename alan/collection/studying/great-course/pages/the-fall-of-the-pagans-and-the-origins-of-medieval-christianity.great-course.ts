import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theFallOfThePagansAndTheOriginsOfMedievalChristianity = {
  id: "019db533-f39f-7d64-90a2-52934e8e2d24",
  type: "page-type/great-course",
  slug: "the-fall-of-the-pagans-and-the-origins-of-medieval-christianity",
  title: "The Fall of the Pagans and the Origins of Medieval Christianity",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 752.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-fall-of-the-pagans-and-the-origins-of-medieval-christianity",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-fall-of-the-pagans-and-the-origins-of-medieval-christianity",
    },
  ],
} as const satisfies GreatCourse
