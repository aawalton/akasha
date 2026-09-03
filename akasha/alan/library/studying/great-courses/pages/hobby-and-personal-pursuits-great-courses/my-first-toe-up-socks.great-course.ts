import type { GreatCourse } from "../../great-course.page-type.ts"

export const myFirstToeUpSocks = {
  id: "019db533-f39e-7438-9119-ac8ca241a4ae",
  pageTypeSlug: "great-course",
  slug: "my-first-toe-up-socks",
  title: "My First Toe-Up Socks",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 117,
  ownProgress: 117,
  partOfSlugs: ["all-great-courses", "hobby-and-personal-pursuits-great-courses"],
  source: "the-great-courses",
  externalId: "my-first-toe-up-socks",
  externalLink: "https://www.thegreatcoursesplus.com/my-first-toe-up-socks",
} as const satisfies GreatCourse
