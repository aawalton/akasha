import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theWorldOfBiblicalIsrael = {
  id: "019db533-f39f-7ff9-893f-b9f68082338f",
  type: "page-type/great-course",
  slug: "the-world-of-biblical-israel",
  title: "The World of Biblical Israel",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 738.6,
  ownProgress: 738.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-world-of-biblical-israel",
      externalLink: "https://www.thegreatcoursesplus.com/the-world-of-biblical-israel",
    },
  ],
} as const satisfies GreatCourse
