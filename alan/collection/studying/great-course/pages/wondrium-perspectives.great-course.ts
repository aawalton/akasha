import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const wondriumPerspectives = {
  id: "019db533-f39e-79a8-8205-eaba4fef9fad",
  type: "page-type/great-course",
  slug: "wondrium-perspectives",
  title: "Wondrium Perspectives",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 473.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-perspectives",
      externalLink: "https://plus.thegreatcourses.com/wondrium-perspectives",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
