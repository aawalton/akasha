import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureAllAboutYourBrain = {
  id: "019db533-f39e-7f23-a26c-8990f7e2579a",
  type: "page-type/great-course",
  slug: "pilot-lecture-all-about-your-brain",
  title: "Pilot Lecture: All about Your Brain",
  status: "completed",
  grade: "C",
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
      externalId: "wondrium-pilots-all-about-your-brain",
      externalLink: "https://www.thegreatcoursesplus.com/wondrium-pilots-all-about-your-brain",
    },
  ],
} as const satisfies GreatCourse
