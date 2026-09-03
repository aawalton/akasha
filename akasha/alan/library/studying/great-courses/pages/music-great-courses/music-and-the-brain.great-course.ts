import type { GreatCourse } from "../../great-course.page-type.ts"

export const musicAndTheBrain = {
  id: "019db533-f3a0-72e9-928a-9e08bb1ee127",
  pageTypeSlug: "great-course",
  slug: "music-and-the-brain",
  title: "Music and the Brain",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 554.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "music-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "music-and-the-brain",
  externalLink: "https://www.thegreatcoursesplus.com/music-and-the-brain",
} as const satisfies GreatCourse
