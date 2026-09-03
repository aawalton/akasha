import type { GreatCourse } from "../../great-course.page-type.ts"

export const theArtOfReading = {
  id: "f2be3b92-ea4f-5c20-9cd6-00eb67d08275",
  pageTypeSlug: "great-course",
  slug: "the-art-of-reading",
  title: "The Art of Reading",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 24,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses"],
  source: "the-great-courses",
  externalId: "the-art-of-reading",
  externalLink: "https://plus.thegreatcourses.com/the-art-of-reading",
} as const satisfies GreatCourse
