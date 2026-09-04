import type { GreatCourse } from "../../great-course.page-type.ts"

export const theIntelligentBrain = {
  id: "019db533-f39f-71b5-ac8f-3435ff4d52d3",
  pageTypeSlug: "great-course",
  slug: "the-intelligent-brain",
  title: "The Intelligent Brain",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 526.8,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "the-intelligent-brain",
  externalLink: "https://www.thegreatcoursesplus.com/the-intelligent-brain",
} as const satisfies GreatCourse
