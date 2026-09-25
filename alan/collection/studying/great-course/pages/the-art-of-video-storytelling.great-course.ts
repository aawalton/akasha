import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theArtOfVideoStorytelling = {
  id: "019db533-f39e-7535-9729-3431b4831ceb",
  type: "page-type/great-course",
  slug: "the-art-of-video-storytelling",
  title: "The Art of Video Storytelling",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 304.2,
  ownProgress: 304.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-art-of-video-storytelling",
      externalLink: "https://www.thegreatcoursesplus.com/the-art-of-video-storytelling",
    },
  ],
} as const satisfies GreatCourse
