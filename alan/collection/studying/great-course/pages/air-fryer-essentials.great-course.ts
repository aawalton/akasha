import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const airFryerEssentials = {
  id: "019db533-f398-73fe-977f-d16feccbc07d",
  type: "page-type/great-course",
  slug: "air-fryer-essentials",
  title: "Air Fryer Essentials",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 87.6,
  ownProgress: 87.6,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "air-fryer-essentials",
      externalLink: "https://www.thegreatcoursesplus.com/air-fryer-essentials",
    },
  ],
} as const satisfies GreatCourse
