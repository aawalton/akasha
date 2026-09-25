import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureEvenTutankhamunGotTheBlues = {
  id: "019db533-f3a0-7334-bf3c-8a62b3f89e91",
  type: "page-type/great-course",
  slug: "pilot-lecture-even-tutankhamun-got-the-blues",
  title: "Pilot Lecture: Even Tutankhamun Got the Blues",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 30.6,
  ownProgress: 30.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-pilots-even-tutankhamun-got-the-blues",
      externalLink:
        "https://www.thegreatcoursesplus.com/wondrium-pilots-even-tutankhamun-got-the-blues",
    },
  ],
} as const satisfies GreatCourse
