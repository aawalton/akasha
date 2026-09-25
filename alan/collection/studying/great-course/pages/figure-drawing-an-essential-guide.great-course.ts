import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const figureDrawingAnEssentialGuide = {
  id: "019db533-f398-7405-8ed1-589a4143707b",
  type: "page-type/great-course",
  slug: "figure-drawing-an-essential-guide",
  title: "Figure Drawing: An Essential Guide",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 93.6,
  ownProgress: 93.6,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "figure-drawing-an-essential-guide",
      externalLink: "https://www.thegreatcoursesplus.com/figure-drawing-an-essential-guide",
    },
  ],
} as const satisfies GreatCourse
