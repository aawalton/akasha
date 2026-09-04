import type { GreatCourse } from "../../great-course.page-type.ts"

export const treatingAnxiety = {
  id: "019db533-f3a0-7689-a6e9-ab565d88eaf4",
  pageTypeSlug: "great-course",
  slug: "treating-anxiety",
  title: "Treating Anxiety",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 357,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "health-and-mindfulness-great-courses"],
  source: "the-great-courses",
  externalId: "treating-anxiety",
  externalLink: "https://www.thegreatcoursesplus.com/treating-anxiety",
} as const satisfies GreatCourse
