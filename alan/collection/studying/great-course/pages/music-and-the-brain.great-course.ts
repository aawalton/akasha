import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const musicAndTheBrain = {
  id: "019db533-f3a0-72e9-928a-9e08bb1ee127",
  type: "page-type/great-course",
  slug: "music-and-the-brain",
  title: "Music and the Brain",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 554.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "music-and-the-brain",
      externalLink: "https://www.thegreatcoursesplus.com/music-and-the-brain",
    },
  ],
} as const satisfies GreatCourse
