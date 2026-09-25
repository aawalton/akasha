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
      externalLink: "https://www.thegreatcoursesplus.com/baking-with-the-gluten-free-girl",
    },
  ],
} as const satisfies GreatCourse
