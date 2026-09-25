import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const sketchingPeoplePlacesAndLandscapes = {
  id: "019db533-f39f-748e-903a-9df062495a77",
  type: "page-type/great-course",
  slug: "sketching-people-places-and-landscapes",
  title: "Sketching People, Places, and Landscapes",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 763.2,
  ownProgress: 763.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "sketching-people-places-and-landscapes",
      externalLink: "https://www.thegreatcoursesplus.com/sketching-people-places-and-landscapes",
    },
  ],
} as const satisfies GreatCourse
