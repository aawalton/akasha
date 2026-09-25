import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const proveItTheArtOfMathematicalArgument = {
  id: "019db533-f3a0-733c-8489-986b71d3954c",
  type: "page-type/great-course",
  slug: "prove-it-the-art-of-mathematical-argument",
  title: "Prove It: The Art of Mathematical Argument",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 739.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "prove-it-the-art-of-mathematical-argument",
      externalLink: "https://www.thegreatcoursesplus.com/prove-it-the-art-of-mathematical-argument",
    },
  ],
} as const satisfies GreatCourse
