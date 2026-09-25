import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const adobePhotoshopCcTheCompleteGuide = {
  id: "019db533-f39e-750f-a43b-1e90172e91a9",
  type: "page-type/great-course",
  slug: "adobe-photoshop-cc-the-complete-guide",
  title: "Adobe Photoshop CC: The Complete Guide",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 1509,
  ownProgress: 1509,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "adobe-photoshop-cc-the-complete-guide",
      externalLink: "https://www.thegreatcoursesplus.com/adobe-photoshop-cc-the-complete-guide",
    },
  ],
} as const satisfies GreatCourse
