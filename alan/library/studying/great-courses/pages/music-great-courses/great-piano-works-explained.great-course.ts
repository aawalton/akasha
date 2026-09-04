import type { GreatCourse } from "../../great-course.page-type.ts"

export const greatPianoWorksExplained = {
  id: "019db533-f3a0-7366-afba-83b0af530edb",
  pageTypeSlug: "great-course",
  slug: "great-piano-works-explained",
  title: "Great Piano Works Explained",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 795,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "music-great-courses"],
  source: "the-great-courses",
  externalId: "great-piano-works-explained",
  externalLink: "https://www.thegreatcoursesplus.com/great-piano-works-explained",
} as const satisfies GreatCourse
