import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const essentialTechniquesForOutstandingPaintings = {
  id: "019db533-f398-7412-828a-b685e54bd79e",
  type: "page-type/great-course",
  slug: "essential-techniques-for-outstanding-paintings",
  title: "Essential Techniques for Outstanding Paintings",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 118.8,
  ownProgress: 118.8,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "essential-techniques-for-outstanding-paintings",
      externalLink:
        "https://www.thegreatcoursesplus.com/essential-techniques-for-outstanding-paintings",
    },
  ],
  createdAt: "2026-04-22T12:39:34.040Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
