import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const floralIllustrationWithWatercolorAndGouache = {
  id: "019db533-f39f-7a53-8274-d0a0fe0b3af0",
  type: "page-type/great-course",
  slug: "floral-illustration-with-watercolor-and-gouache",
  title: "Floral Illustration With Watercolor & Gouache",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 82.8,
  ownProgress: 82.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "floral-illustration-with-watercolor-gouache",
      externalLink:
        "https://www.thegreatcoursesplus.com/floral-illustration-with-watercolor-gouache",
    },
  ],
} as const satisfies GreatCourse
