import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEnglishNovel = {
  id: "019db533-f387-7fbd-b1e7-2abb5ea63b34",
  type: "page-type/great-course",
  slug: "the-english-novel",
  title: "The English Novel",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 745.95,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-english-novel",
      externalLink: "https://www.thegreatcoursesplus.com/the-english-novel",
    },
  ],
} as const satisfies GreatCourse
