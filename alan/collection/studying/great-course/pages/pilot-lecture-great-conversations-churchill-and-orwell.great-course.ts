import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureGreatConversationsChurchillAndOrwell = {
  id: "019db533-f3a0-70b8-8493-e81da684f3e6",
  type: "page-type/great-course",
  slug: "pilot-lecture-great-conversations-churchill-and-orwell",
  title: "Pilot Lecture: Great Conversations: Churchill and Orwell",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 28.8,
  ownProgress: 28.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "plus-pilots-great-conversations-churchill-and-orwell",
      externalLink:
        "https://www.thegreatcoursesplus.com/plus-pilots-great-conversations-churchill-and-orwell",
    },
  ],
} as const satisfies GreatCourse
