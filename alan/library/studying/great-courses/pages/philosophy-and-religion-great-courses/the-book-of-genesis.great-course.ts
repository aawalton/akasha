import type { GreatCourse } from "../../great-course.page-type.ts"

export const theBookOfGenesis = {
  id: "019db533-f39e-7c0a-b532-0ec73722880f",
  pageTypeSlug: "great-course",
  slug: "the-book-of-genesis",
  title: "The Book of Genesis",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 749.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "philosophy-and-religion-great-courses"],
  source: "the-great-courses",
  externalId: "the-book-of-genesis",
  externalLink: "https://www.thegreatcoursesplus.com/the-book-of-genesis",
} as const satisfies GreatCourse
