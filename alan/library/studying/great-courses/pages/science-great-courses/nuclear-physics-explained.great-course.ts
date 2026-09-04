import type { GreatCourse } from "../../great-course.page-type.ts"

export const nuclearPhysicsExplained = {
  id: "019db533-f39f-711f-a376-7036f650d73f",
  pageTypeSlug: "great-course",
  slug: "nuclear-physics-explained",
  title: "Nuclear Physics Explained",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 729,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "nuclear-physics-explained",
  externalLink: "https://www.thegreatcoursesplus.com/nuclear-physics-explained",
} as const satisfies GreatCourse
