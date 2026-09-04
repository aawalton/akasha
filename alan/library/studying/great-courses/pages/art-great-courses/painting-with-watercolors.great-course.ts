import type { GreatCourse } from "../../great-course.page-type.ts"

export const paintingWithWatercolors = {
  id: "019db533-f39f-75eb-b19e-bc4a7c4dc2bb",
  pageTypeSlug: "great-course",
  slug: "painting-with-watercolors",
  title: "Painting with Watercolors",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 360.6,
  ownProgress: 360.6,
  partOfSlugs: [
    "all-great-courses",
    "art-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "painting-with-watercolors",
  externalLink: "https://www.thegreatcoursesplus.com/painting-with-watercolors",
} as const satisfies GreatCourse
