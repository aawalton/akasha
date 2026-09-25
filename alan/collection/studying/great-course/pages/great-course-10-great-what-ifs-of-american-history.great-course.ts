import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatCourse10GreatWhatIfsOfAmericanHistory = {
  id: "019db533-f3a0-71c2-b940-c2883eccd3b3",
  type: "page-type/great-course",
  slug: "great-course-10-great-what-ifs-of-american-history",
  title: "10 Great What-Ifs of American History",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 253.8,
  ownProgress: 253.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "10-great-what-ifs-of-american-history",
      externalLink: "https://www.thegreatcoursesplus.com/10-great-what-ifs-of-american-history",
    },
  ],
} as const satisfies GreatCourse
