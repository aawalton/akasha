import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToRaiseLifelongLearners = {
  id: "019db533-f39e-76cb-9327-052d4091d28c",
  type: "page-type/great-course",
  slug: "how-to-raise-lifelong-learners",
  title: "How to Raise Lifelong Learners",
  status: "completed",
  grade: "A",
  unit: "unit/minutes",
  ownLength: 165,
  ownProgress: 165,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-raise-lifelong-learners",
      externalLink: "https://www.thegreatcoursesplus.com/how-to-raise-lifelong-learners",
    },
  ],
} as const satisfies GreatCourse
