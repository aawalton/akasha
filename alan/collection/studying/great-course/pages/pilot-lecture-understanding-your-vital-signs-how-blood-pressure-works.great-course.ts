import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureUnderstandingYourVitalSignsHowBloodPressureWorks = {
  id: "019db533-f3a0-7870-9864-a2be3ddbdfb3",
  type: "page-type/great-course",
  slug: "pilot-lecture-understanding-your-vital-signs-how-blood-pressure-works",
  title: "Pilot Lecture: Understanding Your Vital Signs—How Blood Pressure Works",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 31.2,
  ownProgress: 31.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-your-vital-signs-how-blood-pressure-works",
      externalLink:
        "https://www.thegreatcoursesplus.com/understanding-your-vital-signs-how-blood-pressure-works",
    },
  ],
} as const satisfies GreatCourse
