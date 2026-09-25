import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const yourBestBrain = {
  id: "019db533-f3a0-75df-92a7-01944884a4f6",
  type: "page-type/great-course",
  slug: "your-best-brain",
  title: "Your Best Brain",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 770.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/professional-growth-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "your-best-brain",
      externalLink: "https://www.thegreatcoursesplus.com/your-best-brain",
    },
  ],
} as const satisfies GreatCourse
