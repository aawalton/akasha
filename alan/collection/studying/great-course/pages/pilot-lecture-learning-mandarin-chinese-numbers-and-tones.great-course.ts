import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureLearningMandarinChineseNumbersAndTones = {
  id: "019db533-f39f-75ab-8d1d-5cf8dba2e5a9",
  type: "page-type/great-course",
  slug: "pilot-lecture-learning-mandarin-chinese-numbers-and-tones",
  title: "Pilot Lecture: Learning Mandarin Chinese—Numbers and Tones",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 36,
  ownProgress: 36,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "learning-mandarin-chinese-numbers-and-tones",
      externalLink:
        "https://www.thegreatcoursesplus.com/learning-mandarin-chinese-numbers-and-tones",
    },
  ],
} as const satisfies GreatCourse
