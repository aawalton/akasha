import type { GreatCourse } from "../../great-course.page-type.ts"

export const askTheExpert = {
  id: "019db533-f39f-737c-a7a8-45055b15e9ae",
  pageTypeSlug: "great-course",
  slug: "ask-the-expert",
  title: "Ask the Expert",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 52.8,
  ownProgress: 52.8,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "ask-the-expert",
  externalLink: "https://www.thegreatcoursesplus.com/ask-the-expert",
} as const satisfies GreatCourse
