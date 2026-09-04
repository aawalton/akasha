import type { GreatCourse } from "../../great-course.page-type.ts"

export const doItYourselfEngineering = {
  id: "019db533-f39f-7312-81f0-f0ff4860a84a",
  pageTypeSlug: "great-course",
  slug: "do-it-yourself-engineering",
  title: "Do-It-Yourself Engineering",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 794.4,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "hobby-and-personal-pursuits-great-courses",
    "science-great-courses",
  ],
  source: "the-great-courses",
  externalId: "do-it-yourself-engineering",
  externalLink: "https://www.thegreatcoursesplus.com/do-it-yourself-engineering",
} as const satisfies GreatCourse
