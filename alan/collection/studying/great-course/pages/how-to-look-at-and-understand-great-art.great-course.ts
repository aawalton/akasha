import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToLookAtAndUnderstandGreatArt = {
  id: "019db533-f39f-7615-96d0-87c98b82778f",
  type: "page-type/great-course",
  slug: "how-to-look-at-and-understand-great-art",
  title: "How to Look at and Understand Great Art",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 1106.4,
  ownProgress: 1106.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-look-at-and-understand-great-art",
      externalLink: "https://www.thegreatcoursesplus.com/how-to-look-at-and-understand-great-art",
    },
  ],
} as const satisfies GreatCourse
