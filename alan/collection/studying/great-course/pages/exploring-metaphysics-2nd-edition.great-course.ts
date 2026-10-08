import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const exploringMetaphysics2ndEdition = {
  id: "01a06578-671c-7002-a64b-3935933d1ed4",
  type: "page-type/great-course",
  slug: "exploring-metaphysics-2nd-edition",
  title: "Exploring Metaphysics, 2nd Edition",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "exploring-metaphysics-2nd-edition",
      externalLink: "https://plus.thegreatcourses.com/exploring-metaphysics-2nd-edition",
    },
  ],
  createdAt: "2026-09-03T04:13:04.668Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
