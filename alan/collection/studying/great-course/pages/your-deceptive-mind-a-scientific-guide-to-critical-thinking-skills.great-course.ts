import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const yourDeceptiveMindAScientificGuideToCriticalThinkingSkills = {
  id: "019db533-f39e-7ada-a3cb-8cb537ed451c",
  type: "page-type/great-course",
  slug: "your-deceptive-mind-a-scientific-guide-to-critical-thinking-skills",
  title: "Your Deceptive Mind: A Scientific Guide to Critical Thinking Skills",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 765,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "your-deceptive-mind-a-scientific-guide-to-critical-thinking-skills",
      externalLink:
        "https://www.thegreatcoursesplus.com/your-deceptive-mind-a-scientific-guide-to-critical-thinking-skills",
    },
  ],
} as const satisfies GreatCourse
