import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const bachAndTheHighBaroque = {
  id: "019db533-f3a0-7594-b15d-f69138bdbddf",
  type: "page-type/great-course",
  slug: "bach-and-the-high-baroque",
  title: "Bach and the High Baroque",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 1499.4,
  ownProgress: 468.5625,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "bach-and-the-high-baroque",
      externalLink: "https://www.thegreatcoursesplus.com/bach-and-the-high-baroque",
    },
  ],
} as const satisfies GreatCourse
