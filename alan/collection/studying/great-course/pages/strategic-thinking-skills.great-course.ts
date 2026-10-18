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
      externalLink: "https://plus.thegreatcourses.com/strategic-thinking-skills",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
