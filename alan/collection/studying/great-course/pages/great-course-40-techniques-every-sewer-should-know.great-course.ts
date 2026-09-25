import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatCourse40TechniquesEverySewerShouldKnow = {
  id: "019db533-f39e-7794-8e00-c3baf3824ade",
  type: "page-type/great-course",
  slug: "great-course-40-techniques-every-sewer-should-know",
  title: "40 Techniques Every Sewer Should Know",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 256.2,
  ownProgress: 256.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "40-techniques-every-sewer-should-know",
      externalLink: "https://www.thegreatcoursesplus.com/40-techniques-every-sewer-should-know",
    },
  ],
} as const satisfies GreatCourse
