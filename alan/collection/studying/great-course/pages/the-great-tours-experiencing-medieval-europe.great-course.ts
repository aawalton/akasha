import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatToursExperiencingMedievalEurope = {
  id: "019db533-f3a0-706a-8b3d-510961e28f77",
  type: "page-type/great-course",
  slug: "the-great-tours-experiencing-medieval-europe",
  title: "The Great Tours: Experiencing Medieval Europe",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 728.4,
  ownProgress: 728.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-tours-experiencing-medieval-europe",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-great-tours-experiencing-medieval-europe",
    },
  ],
} as const satisfies GreatCourse
