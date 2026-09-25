import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const passionsPhilosophyAndTheIntelligenceOfEmotions = {
  id: "019db533-f3a0-777c-8a66-1ae6a0fc3c9e",
  type: "page-type/great-course",
  slug: "passions-philosophy-and-the-intelligence-of-emotions",
  title: "Passions: Philosophy and the Intelligence of Emotions",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 752.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "passions-philosophy-and-the-intelligence-of-emotions",
      externalLink:
        "https://www.thegreatcoursesplus.com/passions-philosophy-and-the-intelligence-of-emotions",
    },
  ],
} as const satisfies GreatCourse
