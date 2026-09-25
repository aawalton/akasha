import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingHumanEmotions = {
  id: "019db533-f39e-76a4-8767-cf1546e42836",
  type: "page-type/great-course",
  slug: "understanding-human-emotions",
  title: "Understanding Human Emotions",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 318,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-human-emotions",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-human-emotions",
    },
  ],
} as const satisfies GreatCourse
