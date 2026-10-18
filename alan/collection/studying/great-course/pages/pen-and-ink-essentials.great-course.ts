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
      externalLink: "https://plus.thegreatcourses.com/pen-ink-essentials",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
