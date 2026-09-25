import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const americaAfterTheColdWarTheFirst30Years = {
  id: "019db533-f3a0-71fc-81c0-6ebf103d884f",
  type: "page-type/great-course",
  slug: "america-after-the-cold-war-the-first-30-years",
  title: "America after the Cold War: The First 30 Years",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 345,
  ownProgress: 345,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "america-after-the-cold-war-the-first-30-years",
      externalLink:
        "https://www.thegreatcoursesplus.com/america-after-the-cold-war-the-first-30-years",
    },
  ],
} as const satisfies GreatCourse
