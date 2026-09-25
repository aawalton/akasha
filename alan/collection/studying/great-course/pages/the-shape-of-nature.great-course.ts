import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theShapeOfNature = {
  id: "019db533-f39e-7b80-9058-57783f520c5e",
  type: "page-type/great-course",
  slug: "the-shape-of-nature",
  title: "The Shape of Nature",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1119.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-shape-of-nature",
      externalLink: "https://www.thegreatcoursesplus.com/the-shape-of-nature",
    },
  ],
} as const satisfies GreatCourse
