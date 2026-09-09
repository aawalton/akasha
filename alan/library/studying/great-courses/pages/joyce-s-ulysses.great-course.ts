import type { GreatCourse } from "../great-course.page-type.ts"

export const joyceSUlysses = {
  id: "019db533-f387-7fcf-aaa1-8b6b0c8e6000",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "joyce-s-ulysses",
  title: "Joyce's “Ulysses”",
  status: "not-started",
  unit: "minutes",
  ownLength: 730.616667,
  ownProgress: 0,
  partOfCollections: ["all-great-courses"],
  source: "the-great-courses",
  externalId: "joyce-s-ulysses",
  externalLink: "https://www.thegreatcoursesplus.com/joyce-s-ulysses",
} as const satisfies GreatCourse
