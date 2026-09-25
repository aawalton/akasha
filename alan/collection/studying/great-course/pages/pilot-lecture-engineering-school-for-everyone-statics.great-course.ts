import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureEngineeringSchoolForEveryoneStatics = {
  id: "019db533-f39e-7c11-86e6-e16c2e614964",
  type: "page-type/great-course",
  slug: "pilot-lecture-engineering-school-for-everyone-statics",
  title: "Pilot Lecture: Engineering School for Everyone: Statics",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 29.4,
  ownProgress: 29.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "plus-pilots-engineering-school-for-everyone-statics",
      externalLink:
        "https://www.thegreatcoursesplus.com/plus-pilots-engineering-school-for-everyone-statics",
    },
  ],
} as const satisfies GreatCourse
