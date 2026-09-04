import type { GreatCourse } from "../../great-course.page-type.ts"

export const theDeadSeaScrolls = {
  id: "019db533-f39e-7a9c-866a-edb45b70481d",
  pageTypeSlug: "great-course",
  slug: "the-dead-sea-scrolls",
  title: "The Dead Sea Scrolls",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 735.6,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "literature-great-courses",
    "philosophy-and-religion-great-courses",
  ],
  source: "the-great-courses",
  externalId: "the-dead-sea-scrolls",
  externalLink: "https://www.thegreatcoursesplus.com/the-dead-sea-scrolls",
} as const satisfies GreatCourse
