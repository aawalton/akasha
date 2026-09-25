import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureEarthSGreatMassExtinctions = {
  id: "019db533-f39f-7d5a-b0b5-9421d444ee43",
  type: "page-type/great-course",
  slug: "pilot-lecture-earth-s-great-mass-extinctions",
  title: "Pilot Lecture: Earth’s Great Mass Extinctions",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 25.8,
  ownProgress: 25.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pilot-lecture-earth-s-great-mass-extinctions",
      externalLink:
        "https://www.thegreatcoursesplus.com/pilot-lecture-earth-s-great-mass-extinctions",
    },
  ],
} as const satisfies GreatCourse
