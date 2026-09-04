import type { GreatCourse } from "../../great-course.page-type.ts"

export const theStoryOfTheMediterraneanWorld = {
  id: "01a06578-6718-7006-afa7-1e930e1d2090",
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
