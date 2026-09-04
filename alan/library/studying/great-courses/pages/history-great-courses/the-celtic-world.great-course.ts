import type { GreatCourse } from "../../great-course.page-type.ts"

export const theCelticWorld = {
  id: "019db533-f3a0-70c8-b3e5-fb4a51b050cc",
  pageTypeSlug: "great-course",
  slug: "the-celtic-world",
  title: "The Celtic World",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 775.8,
  ownProgress: 775.8,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-celtic-world",
  externalLink: "https://www.thegreatcoursesplus.com/the-celtic-world",
} as const satisfies GreatCourse
