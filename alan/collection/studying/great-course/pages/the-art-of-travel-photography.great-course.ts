import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theArtOfTravelPhotography = {
  id: "019db533-f39f-746e-ab09-27ab782c574d",
  type: "page-type/great-course",
  slug: "the-art-of-travel-photography",
  title: "The Art of Travel Photography",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 165,
  ownProgress: 165,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-art-of-travel-photography",
      externalLink: "https://www.thegreatcoursesplus.com/the-art-of-travel-photography",
    },
  ],
} as const satisfies GreatCourse
