import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const penAndInkEssentials = {
  id: "019db533-f39f-74cd-ae64-5278d998b7bb",
  type: "page-type/great-course",
  slug: "pen-and-ink-essentials",
  title: "Pen & Ink Essentials",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 140.4,
  ownProgress: 140.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pen-ink-essentials",
      externalLink: "https://www.thegreatcoursesplus.com/pen-ink-essentials",
    },
  ],
} as const satisfies GreatCourse
