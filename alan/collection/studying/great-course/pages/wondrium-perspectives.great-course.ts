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
      externalLink: "https://www.thegreatcoursesplus.com/wondrium-perspectives",
    },
  ],
} as const satisfies GreatCourse
