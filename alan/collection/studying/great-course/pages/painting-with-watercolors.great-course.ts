import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const paintingWithWatercolors = {
  id: "019db533-f39f-75eb-b19e-bc4a7c4dc2bb",
  type: "page-type/great-course",
  slug: "painting-with-watercolors",
  title: "Painting with Watercolors",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 360.6,
  ownProgress: 360.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "painting-with-watercolors",
      externalLink: "https://www.thegreatcoursesplus.com/painting-with-watercolors",
    },
  ],
} as const satisfies GreatCourse
