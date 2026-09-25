import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howMusicAndMathematicsRelate = {
  id: "019db533-f3a0-79ed-897f-ec97a5429835",
  type: "page-type/great-course",
  slug: "how-music-and-mathematics-relate",
  title: "How Music and Mathematics Relate",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 563.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-music-and-mathematics-relate",
      externalLink: "https://www.thegreatcoursesplus.com/how-music-and-mathematics-relate",
    },
  ],
} as const satisfies GreatCourse
