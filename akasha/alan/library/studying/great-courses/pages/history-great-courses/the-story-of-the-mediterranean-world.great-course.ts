import type { GreatCourse } from "../../great-course.page-type.ts"

export const theStoryOfTheMediterraneanWorld = {
  id: "d1ef84f1-a9e0-5c95-8607-a12d0e1d2090",
  pageTypeSlug: "great-course",
  slug: "the-story-of-the-mediterranean-world",
  title: "The Story of the Mediterranean World",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 24,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-story-of-the-mediterranean-world",
  externalLink: "https://plus.thegreatcourses.com/the-story-of-the-mediterranean-world",
} as const satisfies GreatCourse
