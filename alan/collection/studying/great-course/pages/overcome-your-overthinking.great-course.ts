import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const overcomeYourOverthinking = {
  id: "019db533-f39e-7456-827f-722d1907fafd",
  type: "page-type/great-course",
  slug: "overcome-your-overthinking",
  title: "Overcome Your Overthinking",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 361.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "overcome-your-overthinking",
      externalLink: "https://www.thegreatcoursesplus.com/overcome-your-overthinking",
    },
  ],
} as const satisfies GreatCourse
