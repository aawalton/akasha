import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theArtOfCriticalDecisionMaking = {
  id: "019db533-f39e-7a4d-a3a8-1433fe9a5ce4",
  type: "page-type/great-course",
  slug: "the-art-of-critical-decision-making",
  title: "The Art of Critical Decision Making",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 739.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-art-of-critical-decision-making",
      externalLink: "https://www.thegreatcoursesplus.com/the-art-of-critical-decision-making",
    },
  ],
} as const satisfies GreatCourse
