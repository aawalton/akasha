import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureATourOfTokyoSGinzaDistrict = {
  id: "019db533-f39f-74e3-a2a8-1ab24263a89f",
  type: "page-type/great-course",
  slug: "pilot-lecture-a-tour-of-tokyo-s-ginza-district",
  title: "Pilot Lecture: A Tour of Tokyo’s Ginza District",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 30.6,
  ownProgress: 30.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pilot-lecture-a-tour-of-tokyo-s-ginza-district",
      externalLink:
        "https://www.thegreatcoursesplus.com/pilot-lecture-a-tour-of-tokyo-s-ginza-district",
    },
  ],
} as const satisfies GreatCourse
