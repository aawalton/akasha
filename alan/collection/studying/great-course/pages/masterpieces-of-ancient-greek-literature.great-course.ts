import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const masterpiecesOfAncientGreekLiterature = {
  id: "019db533-f388-707a-be68-562edc6a8b6f",
  type: "page-type/great-course",
  slug: "masterpieces-of-ancient-greek-literature",
  title: "Masterpieces of Ancient Greek Literature",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1105.133333,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "masterpieces-of-ancient-greek-literature",
      externalLink: "https://plus.thegreatcourses.com/masterpieces-of-ancient-greek-literature",
    },
  ],
  createdAt: "2026-04-22T12:39:34.024Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
