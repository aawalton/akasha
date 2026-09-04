import type { GreatCourse } from "../../great-course.page-type.ts"

export const theAddictiveBrain = {
  id: "019db533-f3a0-7669-bc12-b22330fe3205",
  pageTypeSlug: "great-course",
  slug: "the-addictive-brain",
  title: "The Addictive Brain",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 383.4,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "health-and-mindfulness-great-courses",
    "learning-paths-great-courses",
    "science-great-courses",
  ],
  source: "the-great-courses",
  externalId: "the-addictive-brain",
  externalLink: "https://www.thegreatcoursesplus.com/the-addictive-brain",
} as const satisfies GreatCourse
