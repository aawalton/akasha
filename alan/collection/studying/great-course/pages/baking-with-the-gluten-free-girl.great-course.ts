import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const bakingWithTheGlutenFreeGirl = {
  id: "019db533-f398-73d9-900e-cc0c24e91ed5",
  type: "page-type/great-course",
  slug: "baking-with-the-gluten-free-girl",
  title: "Baking With the Gluten-Free Girl",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 114.6,
  ownProgress: 114.6,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "baking-with-the-gluten-free-girl",
      externalLink: "https://plus.thegreatcourses.com/baking-with-the-gluten-free-girl",
    },
  ],
  createdAt: "2026-04-22T12:39:34.040Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
