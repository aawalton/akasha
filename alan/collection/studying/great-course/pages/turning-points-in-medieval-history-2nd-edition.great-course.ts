import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const turningPointsInMedievalHistory2ndEdition = {
  id: "01a0d3af-4ecd-7083-96d1-78bc9b6b5b04",
  type: "page-type/great-course",
  slug: "turning-points-in-medieval-history-2nd-edition",
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "turning-points-in-medieval-history-2nd-edition",
      externalLink:
        "https://plus.thegreatcourses.com/turning-points-in-medieval-history-2nd-edition",
    },
  ],
  title: "Turning Points in Medieval History, 2nd Edition",
} as const satisfies GreatCourse
