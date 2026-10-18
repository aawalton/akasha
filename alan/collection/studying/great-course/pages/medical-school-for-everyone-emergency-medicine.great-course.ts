import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const medicalSchoolForEveryoneEmergencyMedicine = {
  id: "019db533-f3a0-77c7-ac3f-0a0156ebb5de",
  type: "page-type/great-course",
  slug: "medical-school-for-everyone-emergency-medicine",
  title: "Medical School for Everyone: Emergency Medicine",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 721.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "medical-school-for-everyone-emergency-medicine",
      externalLink:
        "https://plus.thegreatcourses.com/medical-school-for-everyone-emergency-medicine",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
