import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const handLetteringForBeginners = {
  id: "019db533-f39f-76ab-86cb-49e982df610f",
  type: "page-type/great-course",
  slug: "hand-lettering-for-beginners",
  title: "Hand-Lettering for Beginners",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 116.4,
  ownProgress: 116.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "hand-lettering-for-beginners",
      externalLink: "https://www.thegreatcoursesplus.com/hand-lettering-for-beginners",
    },
  ],
} as const satisfies GreatCourse
