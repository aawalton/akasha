import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureGuideToTinkeringElectricityAndBasicCircuits = {
  id: "019db533-f39e-7601-872e-9842dc0df99b",
  type: "page-type/great-course",
  slug: "pilot-lecture-guide-to-tinkering-electricity-and-basic-circuits",
  title: "Pilot Lecture: Guide to Tinkering: Electricity and Basic Circuits",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 18.6,
  ownProgress: 18.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "plus-pilots-tinkering-electricity-and-basic-circuits",
      externalLink:
        "https://www.thegreatcoursesplus.com/plus-pilots-tinkering-electricity-and-basic-circuits",
    },
  ],
} as const satisfies GreatCourse
