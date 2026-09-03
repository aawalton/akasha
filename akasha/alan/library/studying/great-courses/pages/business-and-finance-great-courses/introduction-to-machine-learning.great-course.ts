import type { GreatCourse } from "../../great-course.page-type.ts"

export const introductionToMachineLearning = {
  id: "019db533-f39f-72b3-9d23-f53c876fee01",
  pageTypeSlug: "great-course",
  slug: "introduction-to-machine-learning",
  title: "Introduction to Machine Learning",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 726,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "business-and-finance-great-courses",
    "professional-growth-great-courses",
    "science-great-courses",
  ],
  source: "the-great-courses",
  externalId: "introduction-to-machine-learning",
  externalLink: "https://www.thegreatcoursesplus.com/introduction-to-machine-learning",
} as const satisfies GreatCourse
