import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureTheGeneticsOfCancer = {
  id: "019db533-f39f-71ff-a29c-f7b1715431e1",
  type: "page-type/great-course",
  slug: "pilot-lecture-the-genetics-of-cancer",
  title: "Pilot Lecture: The Genetics of Cancer",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 30,
  ownProgress: 30,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-genetics-of-cancer",
      externalLink: "https://www.thegreatcoursesplus.com/the-genetics-of-cancer",
    },
  ],
} as const satisfies GreatCourse
