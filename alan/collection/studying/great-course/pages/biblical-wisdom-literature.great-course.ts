import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const biblicalWisdomLiterature = {
  id: "019db533-f39e-7aca-b9d8-2eb4fb60f78e",
  type: "page-type/great-course",
  slug: "biblical-wisdom-literature",
  title: "Biblical Wisdom Literature",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 1113,
  ownProgress: 1113,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "biblical-wisdom-literature",
      externalLink: "https://plus.thegreatcourses.com/biblical-wisdom-literature",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
