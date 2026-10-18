import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const introductionToGreekPhilosophy = {
  id: "019db533-f388-70b4-9c53-a7e0e7212889",
  type: "page-type/great-course",
  slug: "introduction-to-greek-philosophy",
  title: "Introduction to Greek Philosophy",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 736.05,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "introduction-to-greek-philosophy",
      externalLink: "https://plus.thegreatcourses.com/introduction-to-greek-philosophy",
    },
  ],
  createdAt: "2026-04-22T12:39:34.024Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
