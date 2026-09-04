import type { GreatCourse } from "../../great-course.page-type.ts"

export const shakespeareSTragedies = {
  id: "019db533-f39e-787a-8684-f9e0ee7505a7",
  pageTypeSlug: "great-course",
  slug: "shakespeare-s-tragedies",
  title: "Shakespeare's Tragedies",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 831,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "literature-great-courses"],
  source: "the-great-courses",
  externalId: "shakespeares-tragedies",
  externalLink: "https://www.thegreatcoursesplus.com/shakespeares-tragedies",
} as const satisfies GreatCourse
