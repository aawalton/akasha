import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howWeMoveTheGrossAnatomyOfMotion = {
  id: "019db533-f39f-7327-9a7f-9c84f46fd7b1",
  type: "page-type/great-course",
  slug: "how-we-move-the-gross-anatomy-of-motion",
  title: "How We Move: The Gross Anatomy of Motion",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 754.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-we-move-the-gross-anatomy-of-motion",
      externalLink: "https://www.thegreatcoursesplus.com/how-we-move-the-gross-anatomy-of-motion",
    },
  ],
} as const satisfies GreatCourse
