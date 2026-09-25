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
        "https://www.thegreatcoursesplus.com/medical-school-for-everyone-emergency-medicine",
    },
  ],
} as const satisfies GreatCourse
