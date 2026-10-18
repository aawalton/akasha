import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const bakingBootCampCakesAndCrusts = {
  id: "019db533-f398-73f1-942a-42b89c2ef96e",
  type: "page-type/great-course",
  slug: "baking-boot-camp-cakes-and-crusts",
  title: "Baking Boot Camp: Cakes & Crusts",
  status: "completed",
  unit: "unit/minutes",
  ownLength: 171.6,
  ownProgress: 171.6,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "baking-boot-camp-cakes-crusts",
      externalLink: "https://plus.thegreatcourses.com/baking-boot-camp-cakes-crusts",
    },
  ],
  createdAt: "2026-04-22T12:39:34.040Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
