import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const englishGrammarBootCamp = {
  id: "019db533-f39e-7765-a92b-ace7a7c97a99",
  type: "page-type/great-course",
  slug: "english-grammar-boot-camp",
  title: "English Grammar Boot Camp",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 753,
  ownProgress: 753,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "english-grammar-boot-camp",
      externalLink: "https://plus.thegreatcourses.com/english-grammar-boot-camp",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
