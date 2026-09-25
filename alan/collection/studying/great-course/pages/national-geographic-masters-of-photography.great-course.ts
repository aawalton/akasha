import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const nationalGeographicMastersOfPhotography = {
  id: "019db533-f39f-75b6-a2d4-790437d1498a",
  type: "page-type/great-course",
  slug: "national-geographic-masters-of-photography",
  title: "National Geographic Masters of Photography",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 766.8,
  ownProgress: 766.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "national-geographic-masters-of-photography",
      externalLink:
        "https://www.thegreatcoursesplus.com/national-geographic-masters-of-photography",
    },
  ],
} as const satisfies GreatCourse
