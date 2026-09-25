import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureWhatIsMoney = {
  id: "019db533-f39e-7430-8b0c-9d310704097e",
  type: "page-type/great-course",
  slug: "pilot-lecture-what-is-money",
  title: "Pilot Lecture: What Is Money?",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 25.8,
  ownProgress: 25.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "plus-lecture-what-is-money",
      externalLink: "https://www.thegreatcoursesplus.com/plus-lecture-what-is-money",
    },
  ],
} as const satisfies GreatCourse
