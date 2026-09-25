import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureUnderstandingHumanEmotions = {
  id: "019db533-f39f-7254-bc58-85a412173cd4",
  type: "page-type/great-course",
  slug: "pilot-lecture-understanding-human-emotions",
  title: "Pilot Lecture: Understanding Human Emotions",
  status: "archived",
  unit: "unit/minutes",
  ownLength: 25.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "plus-pilots-understanding-human-emotions",
      externalLink: "https://www.thegreatcoursesplus.com/plus-pilots-understanding-human-emotions",
    },
  ],
} as const satisfies GreatCourse
