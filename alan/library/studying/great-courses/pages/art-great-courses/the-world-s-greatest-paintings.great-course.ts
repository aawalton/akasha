import type { GreatCourse } from "../../great-course.page-type.ts"

export const theWorldSGreatestPaintings = {
  id: "019db533-f39f-7459-8b4f-722b9a48e37c",
  pageTypeSlug: "great-course",
  slug: "the-world-s-greatest-paintings",
  title: "The World's Greatest Paintings",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 732,
  ownProgress: 732,
  partOfSlugs: ["all-great-courses", "art-great-courses"],
  source: "the-great-courses",
  externalId: "the-world-s-greatest-paintings",
  externalLink: "https://www.thegreatcoursesplus.com/the-world-s-greatest-paintings",
} as const satisfies GreatCourse
