import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const artJournalingWithWatercolorInkAndMore = {
  id: "019db533-f39f-75f5-9e8a-b90930e10f7e",
  type: "page-type/great-course",
  slug: "art-journaling-with-watercolor-ink-and-more",
  title: "Art Journaling With Watercolor, Ink & More",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 148.2,
  ownProgress: 148.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "art-journaling-with-watercolor-ink-more",
      externalLink: "https://www.thegreatcoursesplus.com/art-journaling-with-watercolor-ink-more",
    },
  ],
} as const satisfies GreatCourse
