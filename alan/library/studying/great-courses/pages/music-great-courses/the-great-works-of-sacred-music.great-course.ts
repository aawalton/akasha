import type { GreatCourse } from "../../great-course.page-type.ts"

export const theGreatWorksOfSacredMusic = {
  id: "019db533-f3a0-724f-a087-c41ab912999b",
  pageTypeSlug: "great-course",
  slug: "the-great-works-of-sacred-music",
  title: "The Great Works of Sacred Music",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 708.6,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "music-great-courses",
    "philosophy-and-religion-great-courses",
  ],
  source: "the-great-courses",
  externalId: "the-great-works-of-sacred-music",
  externalLink: "https://www.thegreatcoursesplus.com/the-great-works-of-sacred-music",
} as const satisfies GreatCourse
