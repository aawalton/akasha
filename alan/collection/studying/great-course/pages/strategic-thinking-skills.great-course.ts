import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const strategicThinkingSkills = {
  id: "019db533-f39e-7418-8bb7-97de8cdde1b3",
  type: "page-type/great-course",
  slug: "strategic-thinking-skills",
  title: "Strategic Thinking Skills",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 730.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "strategic-thinking-skills",
      externalLink: "https://www.thegreatcoursesplus.com/strategic-thinking-skills",
    },
  ],
} as const satisfies GreatCourse
