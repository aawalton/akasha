import type { GreatCourse } from "../great-course.page-type.types.ts"

export const martialArtsForYourMindAndBody = {
  id: "019db533-f3a0-79d8-b4c0-a7dc5cad1a5a",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "martial-arts-for-your-mind-and-body",
  title: "Martial Arts for Your Mind and Body",
  status: "not-started",
  unit: "minutes",
  ownLength: 768,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "health-and-mindfulness-great-courses"],
  source: "the-great-courses",
  externalId: "martial-arts-for-your-mind-and-body",
  externalLink: "https://www.thegreatcoursesplus.com/martial-arts-for-your-mind-and-body",
} as const satisfies GreatCourse
