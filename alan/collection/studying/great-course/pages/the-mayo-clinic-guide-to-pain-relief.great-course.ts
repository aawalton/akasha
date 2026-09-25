import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theMayoClinicGuideToPainRelief = {
  id: "019db533-f3a0-76f3-a63d-86a3838acdaf",
  type: "page-type/great-course",
  slug: "the-mayo-clinic-guide-to-pain-relief",
  title: "The Mayo Clinic Guide to Pain Relief",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 372,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-mayo-clinic-guide-to-pain-relief",
      externalLink: "https://www.thegreatcoursesplus.com/the-mayo-clinic-guide-to-pain-relief",
    },
  ],
} as const satisfies GreatCourse
