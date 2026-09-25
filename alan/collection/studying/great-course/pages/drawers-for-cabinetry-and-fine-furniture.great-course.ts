import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const drawersForCabinetryAndFineFurniture = {
  id: "019db533-f39e-7684-ba6d-594d07a816d2",
  type: "page-type/great-course",
  slug: "drawers-for-cabinetry-and-fine-furniture",
  title: "Drawers for Cabinetry & Fine Furniture",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 202.8,
  ownProgress: 202.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "drawers-for-cabinetry-fine-furniture",
      externalLink: "https://www.thegreatcoursesplus.com/drawers-for-cabinetry-fine-furniture",
    },
  ],
} as const satisfies GreatCourse
