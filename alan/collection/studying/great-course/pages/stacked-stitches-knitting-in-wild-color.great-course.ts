import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const stackedStitchesKnittingInWildColor = {
  id: "019db533-f39e-758c-bf89-f1b7167a290c",
  type: "page-type/great-course",
  slug: "stacked-stitches-knitting-in-wild-color",
  title: "Stacked Stitches: Knitting in Wild Color",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 136.8,
  ownProgress: 136.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "stacked-stitches-knitting-in-wild-color",
      externalLink: "https://www.thegreatcoursesplus.com/stacked-stitches-knitting-in-wild-color",
    },
  ],
} as const satisfies GreatCourse
