import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const medicalSchoolForEveryoneGrandRoundsCases = {
  id: "019db533-f3a0-7792-937f-56f114b05296",
  type: "page-type/great-course",
  slug: "medical-school-for-everyone-grand-rounds-cases",
  title: "Medical School for Everyone: Grand Rounds Cases",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 747,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "medical-school-for-everyone-grand-rounds-cases",
      externalLink:
        "https://plus.thegreatcourses.com/medical-school-for-everyone-grand-rounds-cases",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
