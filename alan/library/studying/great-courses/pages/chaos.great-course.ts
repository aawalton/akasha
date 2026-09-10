import type { GreatCourse } from "../great-course.page-type.types.ts"

export const chaos = {
  id: "019db533-f39f-7352-a7e4-ebaec20d2199",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "chaos",
  title: "Chaos",
  status: "not-started",
  unit: "minutes",
  ownLength: 737.4,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "chaos",
  externalLink: "https://www.thegreatcoursesplus.com/chaos",
} as const satisfies GreatCourse
