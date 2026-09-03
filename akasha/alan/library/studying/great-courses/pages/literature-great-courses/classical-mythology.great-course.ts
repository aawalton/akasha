import type { GreatCourse } from "../../great-course.page-type.ts"

export const classicalMythology = {
  id: "019db533-f39e-79c4-9b16-fddf360be6a9",
  pageTypeSlug: "great-course",
  slug: "classical-mythology",
  title: "Classical Mythology",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 741,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "literature-great-courses"],
  source: "the-great-courses",
  externalId: "classical-mythology",
  externalLink: "https://www.thegreatcoursesplus.com/classical-mythology",
} as const satisfies GreatCourse
