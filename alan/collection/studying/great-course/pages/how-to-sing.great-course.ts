import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToSing = {
  id: "019db533-f3a0-7383-858d-4d0584951414",
  type: "page-type/great-course",
  slug: "how-to-sing",
  title: "How to Sing",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1117.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-sing",
      externalLink: "https://www.thegreatcoursesplus.com/how-to-sing",
    },
  ],
} as const satisfies GreatCourse
