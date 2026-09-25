import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureMaxPlanckAndTheUltravioletCatastrophe = {
  id: "019db533-f3a0-70d2-a916-5a13b1073f41",
  type: "page-type/great-course",
  slug: "pilot-lecture-max-planck-and-the-ultraviolet-catastrophe",
  title: "Pilot Lecture: Max Planck and the Ultraviolet Catastrophe",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 19.8,
  ownProgress: 19.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "plus-pilots-ma-planck-and-the-ultraviolet-catastrophe",
      externalLink:
        "https://www.thegreatcoursesplus.com/plus-pilots-ma-planck-and-the-ultraviolet-catastrophe",
    },
  ],
} as const satisfies GreatCourse
