import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureNativeAmericanHistoryTheLifeOfCrazyHorse = {
  id: "019db533-f39f-7df9-a129-42c43f250653",
  type: "page-type/great-course",
  slug: "pilot-lecture-native-american-history-the-life-of-crazy-horse",
  title: "Pilot Lecture: Native American History - The Life of Crazy Horse",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 27,
  ownProgress: 27,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "native-american-history-the-life-of-crazy-horse",
      externalLink:
        "https://www.thegreatcoursesplus.com/native-american-history-the-life-of-crazy-horse",
    },
  ],
} as const satisfies GreatCourse
