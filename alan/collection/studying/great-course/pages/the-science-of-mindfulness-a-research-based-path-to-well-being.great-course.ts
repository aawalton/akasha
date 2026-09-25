import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theScienceOfMindfulnessAResearchBasedPathToWellBeing = {
  id: "019db533-f3a0-76fd-b6a1-3bd0f3c21597",
  type: "page-type/great-course",
  slug: "the-science-of-mindfulness-a-research-based-path-to-well-being",
  title: "The Science of Mindfulness: A Research-Based Path to Well-Being",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 852,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-science-of-mindfulness-a-research-based-path-to-well-being",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-science-of-mindfulness-a-research-based-path-to-well-being",
    },
  ],
} as const satisfies GreatCourse
