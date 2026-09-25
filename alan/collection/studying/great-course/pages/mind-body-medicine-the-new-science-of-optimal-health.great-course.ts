import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mindBodyMedicineTheNewScienceOfOptimalHealth = {
  id: "019db533-f3a0-7787-8e1b-18a115077e48",
  type: "page-type/great-course",
  slug: "mind-body-medicine-the-new-science-of-optimal-health",
  title: "Mind-Body Medicine: The New Science of Optimal Health",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1147.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mind-body-medicine-the-new-science-of-optimal-health",
      externalLink:
        "https://www.thegreatcoursesplus.com/mind-body-medicine-the-new-science-of-optimal-health",
    },
  ],
} as const satisfies GreatCourse
