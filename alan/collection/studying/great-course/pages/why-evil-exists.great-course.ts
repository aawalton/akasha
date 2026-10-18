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
      externalLink: "https://plus.thegreatcourses.com/why-evil-exists",
    },
  ],
  createdAt: "2026-04-22T12:39:34.040Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
