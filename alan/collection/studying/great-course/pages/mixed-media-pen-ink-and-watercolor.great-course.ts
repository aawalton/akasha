import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mixedMediaPenInkAndWatercolor = {
  id: "019db533-f39f-7576-8aa1-e0e5a6c75070",
  type: "page-type/great-course",
  slug: "mixed-media-pen-ink-and-watercolor",
  title: "Mixed Media: Pen, Ink & Watercolor",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 187.8,
  ownProgress: 187.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mixed-media-pen-ink-watercolor",
      externalLink: "https://www.thegreatcoursesplus.com/mixed-media-pen-ink-watercolor",
    },
  ],
} as const satisfies GreatCourse
