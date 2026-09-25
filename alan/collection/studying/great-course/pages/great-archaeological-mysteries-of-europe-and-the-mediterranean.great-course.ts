import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatArchaeologicalMysteriesOfEuropeAndTheMediterranean = {
  id: "019db533-f398-7368-ae99-a928b6365638",
  type: "page-type/great-course",
  slug: "great-archaeological-mysteries-of-europe-and-the-mediterranean",
  title: "Great Archaeological Mysteries of Europe and the Mediterranean",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 547.8,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-archaeological-mysteries-of-europe-and-the-mediterranean",
      externalLink:
        "https://www.thegreatcoursesplus.com/great-archaeological-mysteries-of-europe-and-the-mediterranean",
    },
  ],
} as const satisfies GreatCourse
