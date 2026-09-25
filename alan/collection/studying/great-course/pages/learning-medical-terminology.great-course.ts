import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const learningMedicalTerminology = {
  id: "019db533-f388-704f-b81b-d9266fd58536",
  type: "page-type/great-course",
  slug: "learning-medical-terminology",
  title: "Learning Medical Terminology",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 622.966667,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "learning-medical-terminology",
      externalLink: "https://www.thegreatcoursesplus.com/learning-medical-terminology",
    },
  ],
} as const satisfies GreatCourse
