import type { GreatCourse } from "../great-course.page-type.types.ts"

export const askADogTrainer = {
  id: "019db533-f39e-766d-ba4b-560e1cccbac1",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "ask-a-dog-trainer",
  title: "Ask a Dog Trainer",
  status: "completed",
  rank: "D",
  unit: "minutes",
  ownLength: 10.2,
  ownProgress: 10.2,
  partOfCollections: ["all-great-courses", "hobby-and-personal-pursuits-great-courses"],
  source: "the-great-courses",
  externalId: "ask-a-dog-trainer",
  externalLink: "https://www.thegreatcoursesplus.com/ask-a-dog-trainer",
} as const satisfies GreatCourse
