import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const yourBestBrain = {
  id: "019db533-f3a0-75df-92a7-01944884a4f6",
  type: "great-course",
  slug: "your-best-brain",
  title: "Your Best Brain",
  status: "not-started",
  unit: "minutes",
  ownLength: 770.4,
  ownProgress: 0,
  partOfCollections: [
    "all-great-courses",
    "health-and-mindfulness-great-courses",
    "professional-growth-great-courses",
    "science-great-courses",
  ],
  source: "the-great-courses",
  externalId: "your-best-brain",
  externalLink: "https://www.thegreatcoursesplus.com/your-best-brain",
} as const satisfies GreatCourse
