import type { GreatCourse } from "../../great-course.page-type.ts"

export const sacredTextsOfTheWorld = {
  id: "019db533-f39e-7c45-8f02-0c1914fa5d93",
  pageTypeSlug: "great-course",
  slug: "sacred-texts-of-the-world",
  title: "Sacred Texts of the World",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1098.6,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "learning-paths-great-courses",
    "literature-great-courses",
    "philosophy-and-religion-great-courses",
  ],
  source: "the-great-courses",
  externalId: "sacred-texts-of-the-world",
  externalLink: "https://www.thegreatcoursesplus.com/sacred-texts-of-the-world",
} as const satisfies GreatCourse
