import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureBusinessEtiquetteForTheVirtualWorld = {
  id: "019db533-f39e-7421-b09d-a2c774751a2d",
  type: "page-type/great-course",
  slug: "pilot-lecture-business-etiquette-for-the-virtual-world",
  title: "Pilot Lecture: Business Etiquette for the Virtual World",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 30,
  ownProgress: 30,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "plus-pilots-business-etiquette-for-the-virtual-world",
      externalLink:
        "https://www.thegreatcoursesplus.com/plus-pilots-business-etiquette-for-the-virtual-world",
    },
  ],
} as const satisfies GreatCourse
