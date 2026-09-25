import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingGreekAndRomanTechnology = {
  id: "019db533-f39f-7a88-9c43-8cc15d98a104",
  type: "page-type/great-course",
  slug: "understanding-greek-and-roman-technology",
  title: "Understanding Greek and Roman Technology",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 740.4,
  ownProgress: 740.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-greek-and-roman-technology",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-greek-and-roman-technology",
    },
  ],
} as const satisfies GreatCourse
