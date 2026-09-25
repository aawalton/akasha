import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const adobeLightroomClassicCcTheCompleteGuide = {
  id: "019db533-f39e-7802-b7ab-63d821b48651",
  type: "page-type/great-course",
  slug: "adobe-lightroom-classic-cc-the-complete-guide",
  title: "Adobe Lightroom Classic CC: The Complete Guide",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 1429.2,
  ownProgress: 1429.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "adobe-lightroom-classic-cc-the-complete-guide",
      externalLink:
        "https://www.thegreatcoursesplus.com/adobe-lightroom-classic-cc-the-complete-guide",
    },
  ],
} as const satisfies GreatCourse
