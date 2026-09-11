import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const physicsAndOurUniverse = {
  id: "019db533-f3a0-72c6-a83c-dc93be4f7623",
  type: "great-course",
  slug: "physics-and-our-universe",
  title: "Physics and Our Universe",
  status: "in-progress",
  unit: "minutes",
  ownLength: 1830.6,
  ownProgress: 91.53,
  partOfCollections: ["all-great-courses", "mathematics-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "physics-and-our-universe",
  externalLink: "https://www.thegreatcoursesplus.com/physics-and-our-universe",
} as const satisfies GreatCourse
