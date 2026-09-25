import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const freeMotionQuiltedGifts = {
  id: "019db533-f39e-7492-840c-90c2f970fcb4",
  type: "page-type/great-course",
  slug: "free-motion-quilted-gifts",
  title: "Free-Motion Quilted Gifts",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 78.6,
  ownProgress: 78.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "free-motion-quilted-gifts",
      externalLink: "https://www.thegreatcoursesplus.com/free-motion-quilted-gifts",
    },
  ],
} as const satisfies GreatCourse
