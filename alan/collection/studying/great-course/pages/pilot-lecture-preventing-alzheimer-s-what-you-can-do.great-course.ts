import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLecturePreventingAlzheimerSWhatYouCanDo = {
  id: "019db533-f3a0-789a-b0b3-a34becf23f17",
  type: "page-type/great-course",
  slug: "pilot-lecture-preventing-alzheimer-s-what-you-can-do",
  title: "Pilot Lecture: Preventing Alzheimer’s—What You Can Do",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 34.2,
  ownProgress: 34.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "preventing-alzheimer-s-what-you-can-do",
      externalLink: "https://www.thegreatcoursesplus.com/preventing-alzheimer-s-what-you-can-do",
    },
  ],
} as const satisfies GreatCourse
