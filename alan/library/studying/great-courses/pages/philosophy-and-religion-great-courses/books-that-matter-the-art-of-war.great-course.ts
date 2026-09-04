import type { GreatCourse } from "../../great-course.page-type.ts"

export const booksThatMatterTheArtOfWar = {
  id: "01a06578-671c-7001-8a6b-0a532e89a9ab",
  pageTypeSlug: "great-course",
  slug: "books-that-matter-the-art-of-war",
  title: "Books That Matter: The Art of War",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 12,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "philosophy-and-religion-great-courses"],
  source: "the-great-courses",
  externalId: "books-that-matter-the-art-of-war",
  externalLink: "https://plus.thegreatcourses.com/books-that-matter-the-art-of-war",
} as const satisfies GreatCourse
