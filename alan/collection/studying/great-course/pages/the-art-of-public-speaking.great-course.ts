import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theArtOfPublicSpeaking = {
  id: "019db533-f3a0-7131-823a-7f32f34a0016",
  type: "page-type/great-course",
  slug: "the-art-of-public-speaking",
  title: "The Art of Public Speaking",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 376.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-art-of-public-speaking",
      externalLink: "https://www.thegreatcoursesplus.com/the-art-of-public-speaking",
    },
  ],
} as const satisfies GreatCourse
