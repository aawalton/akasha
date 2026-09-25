import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theSkepticSGuideToHealthMedicineAndTheMedia = {
  id: "019db533-f3a0-767e-bc61-82e526f19288",
  type: "page-type/great-course",
  slug: "the-skeptic-s-guide-to-health-medicine-and-the-media",
  title: "The Skeptic's Guide to Health, Medicine, and the Media",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 750.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-skeptics-guide-to-health-medicine-and-the-media",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-skeptics-guide-to-health-medicine-and-the-media",
    },
  ],
} as const satisfies GreatCourse
