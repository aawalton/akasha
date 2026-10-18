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
      externalLink: "https://plus.thegreatcourses.com/air-fryer-essentials",
    },
  ],
  createdAt: "2026-04-22T12:39:34.040Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
