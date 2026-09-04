import type { GreatCourse } from "../../great-course.page-type.ts"

export const theArtOfDebate = {
  id: "019db533-f39e-7299-8507-079d12f31d21",
  pageTypeSlug: "great-course",
  slug: "the-art-of-debate",
  title: "The Art of Debate",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 709.2,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "professional-growth-great-courses"],
  source: "the-great-courses",
  externalId: "the-art-of-debate",
  externalLink: "https://www.thegreatcoursesplus.com/the-art-of-debate",
} as const satisfies GreatCourse
