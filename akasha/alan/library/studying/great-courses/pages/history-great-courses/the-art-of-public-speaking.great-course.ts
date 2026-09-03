import type { GreatCourse } from "../../great-course.page-type.ts"

export const theArtOfPublicSpeaking = {
  id: "019db533-f3a0-7131-823a-7f32f34a0016",
  pageTypeSlug: "great-course",
  slug: "the-art-of-public-speaking",
  title: "The Art of Public Speaking",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 376.2,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "history-great-courses",
    "literature-great-courses",
    "professional-growth-great-courses",
  ],
  source: "the-great-courses",
  externalId: "the-art-of-public-speaking",
  externalLink: "https://www.thegreatcoursesplus.com/the-art-of-public-speaking",
} as const satisfies GreatCourse
