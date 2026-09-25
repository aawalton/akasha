import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const whyEvilExists = {
  id: "019db533-f398-73bc-9077-8d22da68fc34",
  type: "page-type/great-course",
  slug: "why-evil-exists",
  title: "Why Evil Exists",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1148.4,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "why-evil-exists",
      externalLink: "https://www.thegreatcoursesplus.com/why-evil-exists",
    },
  ],
} as const satisfies GreatCourse
