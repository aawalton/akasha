import type { GreatCourse } from "../../great-course.page-type.ts"

export const quickAndEasyComfortFoods = {
  id: "019db533-f38a-7579-b736-22e3b5ada003",
  pageTypeSlug: "great-course",
  slug: "quick-and-easy-comfort-foods",
  title: "Quick and Easy Comfort Foods",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 80,
  ownProgress: 80,
  partOfSlugs: ["all-great-courses"],
  source: "the-great-courses",
  externalId: "quick-and-easy-comfort-foods",
  externalLink: "https://www.thegreatcoursesplus.com/quick-and-easy-comfort-foods",
} as const satisfies GreatCourse
