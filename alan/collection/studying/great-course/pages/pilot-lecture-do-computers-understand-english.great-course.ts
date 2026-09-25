import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureDoComputersUnderstandEnglish = {
  id: "019db533-f39e-72a1-9046-6fed7fe9b336",
  type: "page-type/great-course",
  slug: "pilot-lecture-do-computers-understand-english",
  title: "Pilot Lecture: Do Computers Understand English?",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 32.4,
  ownProgress: 32.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "do-computers-understand-english",
      externalLink: "https://www.thegreatcoursesplus.com/do-computers-understand-english",
    },
  ],
} as const satisfies GreatCourse
