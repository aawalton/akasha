import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const essentialSeedBeadTechniques = {
  id: "019db533-f39f-7a33-8594-188211404bf0",
  type: "page-type/great-course",
  slug: "essential-seed-bead-techniques",
  title: "Essential Seed Bead Techniques",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 154.8,
  ownProgress: 154.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "essential-seed-bead-techniques",
      externalLink: "https://www.thegreatcoursesplus.com/essential-seed-bead-techniques",
    },
  ],
} as const satisfies GreatCourse
