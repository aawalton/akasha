import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const boostingYourEmotionalIntelligence = {
  id: "019db533-f39e-7ca6-a290-e437387c6f9c",
  type: "page-type/great-course",
  slug: "boosting-your-emotional-intelligence",
  title: "Boosting Your Emotional Intelligence",
  status: "completed",
  grade: "A",
  unit: "unit/minutes",
  ownLength: 773.4,
  ownProgress: 773.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "boosting-your-emotional-intelligence",
      externalLink: "https://www.thegreatcoursesplus.com/boosting-your-emotional-intelligence",
    },
  ],
} as const satisfies GreatCourse
