import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const improveYourPaintingsLuminousWatercolorMixing = {
  id: "019db533-f39f-7561-ad29-232a5f53ce88",
  type: "page-type/great-course",
  slug: "improve-your-paintings-luminous-watercolor-mixing",
  title: "Improve Your Paintings: Luminous Watercolor Mixing",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 119.4,
  ownProgress: 119.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-improve-your-paintings-luminous-watercolor-mixing",
      externalLink:
        "https://www.thegreatcoursesplus.com/how-to-improve-your-paintings-luminous-watercolor-mixing",
    },
  ],
} as const satisfies GreatCourse
