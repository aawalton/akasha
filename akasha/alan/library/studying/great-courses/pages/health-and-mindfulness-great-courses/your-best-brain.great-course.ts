import type { GreatCourse } from "../../great-course.page-type.ts"

export const yourBestBrain = {
  id: "019db533-f3a0-75df-92a7-01944884a4f6",
  pageTypeSlug: "great-course",
  slug: "your-best-brain",
  title: "Your Best Brain",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 770.4,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "health-and-mindfulness-great-courses",
    "professional-growth-great-courses",
    "science-great-courses",
  ],
  source: "the-great-courses",
  externalId: "your-best-brain",
  externalLink: "https://www.thegreatcoursesplus.com/your-best-brain",
} as const satisfies GreatCourse
