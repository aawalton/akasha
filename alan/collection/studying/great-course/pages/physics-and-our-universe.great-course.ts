import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const physicsAndOurUniverse = {
  id: "019db533-f3a0-72c6-a83c-dc93be4f7623",
  type: "page-type/great-course",
  slug: "physics-and-our-universe",
  title: "Physics and Our Universe",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 1830.6,
  ownProgress: 91.53,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "physics-and-our-universe",
      externalLink: "https://www.thegreatcoursesplus.com/physics-and-our-universe",
    },
  ],
} as const satisfies GreatCourse
