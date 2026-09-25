import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureExploringHadrianSWall = {
  id: "019db533-f3a0-70fa-adb1-9d9da721d178",
  type: "page-type/great-course",
  slug: "pilot-lecture-exploring-hadrian-s-wall",
  title: "Pilot Lecture: Exploring Hadrian’s Wall",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 24.6,
  ownProgress: 24.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pilot-lecture-exploring-hadrian-s-wall",
      externalLink: "https://www.thegreatcoursesplus.com/pilot-lecture-exploring-hadrian-s-wall",
    },
  ],
} as const satisfies GreatCourse
