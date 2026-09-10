import type { GreatCourse } from "../great-course.page-type.types.ts"

export const howToDraw = {
  id: "019db533-f39f-79a8-a8af-99ca6bfe922c",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "how-to-draw",
  title: "How to Draw",
  status: "completed",
  rank: "D",
  unit: "minutes",
  ownLength: 1087.8,
  ownProgress: 1087.8,
  partOfCollections: [
    "all-great-courses",
    "art-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "how-to-draw",
  externalLink: "https://www.thegreatcoursesplus.com/how-to-draw",
} as const satisfies GreatCourse
