import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theRealHistoryOfSecretSocieties = {
  id: "019db533-f39f-7c9b-a614-b17b8297cfa1",
  type: "page-type/great-course",
  slug: "the-real-history-of-secret-societies",
  title: "The Real History of Secret Societies",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 759,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-real-history-of-secret-societies",
      externalLink: "https://www.thegreatcoursesplus.com/the-real-history-of-secret-societies",
    },
  ],
} as const satisfies GreatCourse
