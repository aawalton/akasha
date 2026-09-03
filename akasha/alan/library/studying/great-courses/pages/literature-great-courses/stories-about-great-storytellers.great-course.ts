import type { GreatCourse } from "../../great-course.page-type.ts"

export const storiesAboutGreatStorytellers = {
  id: "019db533-f39e-785d-b256-61f5499f59ea",
  pageTypeSlug: "great-course",
  slug: "stories-about-great-storytellers",
  title: "Stories about Great Storytellers",
  status: "completed",
  rank: "A",
  unitSlug: "minutes",
  ownLength: 24,
  ownProgress: 24,
  partOfSlugs: ["all-great-courses", "literature-great-courses"],
  source: "the-great-courses",
  externalId: "stories-about-great-storytellers",
  externalLink: "https://www.thegreatcoursesplus.com/stories-about-great-storytellers",
} as const satisfies GreatCourse
