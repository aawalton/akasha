import type { GreatCourse } from "../../great-course.page-type.ts"

export const medicalNewsExplained = {
  id: "019db533-f3a0-77e6-b8dc-a36b9981a2ed",
  pageTypeSlug: "great-course",
  slug: "medical-news-explained",
  title: "Medical News Explained",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 72,
  ownProgress: 72,
  partOfSlugs: ["all-great-courses", "health-and-mindfulness-great-courses"],
  source: "the-great-courses",
  externalId: "medical-news-explained",
  externalLink: "https://www.thegreatcoursesplus.com/medical-news-explained",
} as const satisfies GreatCourse
