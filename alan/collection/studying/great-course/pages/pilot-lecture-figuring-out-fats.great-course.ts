import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureFiguringOutFats = {
  id: "019db533-f388-70df-a3df-f77bbeea7df7",
  type: "page-type/great-course",
  slug: "pilot-lecture-figuring-out-fats",
  title: "Pilot Lecture: Figuring Out Fats",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 31.316667,
  ownProgress: 31.316667,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pilot-lecture-figuring-out-fats",
      externalLink: "https://www.thegreatcoursesplus.com/pilot-lecture-figuring-out-fats",
    },
  ],
} as const satisfies GreatCourse
