import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thinkingLikeAnEconomistAGuideToRationalDecisionMaking = {
  id: "019db533-f39e-73d2-8b0d-6f62362b9a71",
  type: "page-type/great-course",
  slug: "thinking-like-an-economist-a-guide-to-rational-decision-making",
  title: "Thinking like an Economist: A Guide to Rational Decision Making",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 372.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "thinking-like-an-economist-a-guide-to-rational-decision-making",
      externalLink:
        "https://www.thegreatcoursesplus.com/thinking-like-an-economist-a-guide-to-rational-decision-making",
    },
  ],
} as const satisfies GreatCourse
