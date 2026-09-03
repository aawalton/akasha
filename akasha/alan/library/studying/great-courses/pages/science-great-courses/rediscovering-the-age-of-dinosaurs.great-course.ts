import type { GreatCourse } from "../../great-course.page-type.ts"

export const rediscoveringTheAgeOfDinosaurs = {
  id: "019db533-f39e-7eae-963b-b2ffe7c16f50",
  pageTypeSlug: "great-course",
  slug: "rediscovering-the-age-of-dinosaurs",
  title: "Rediscovering the Age of Dinosaurs",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 610.8,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "rediscovering-the-age-of-dinosaurs",
  externalLink: "https://www.thegreatcoursesplus.com/rediscovering-the-age-of-dinosaurs",
} as const satisfies GreatCourse
