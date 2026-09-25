import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatWorldReligionsJudaism = {
  id: "019db533-f39e-7b08-b13f-507e4c72555f",
  type: "page-type/great-course",
  slug: "great-world-religions-judaism",
  title: "Great World Religions: Judaism",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 366,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-world-religions-judaism",
      externalLink: "https://www.thegreatcoursesplus.com/great-world-religions-judaism",
    },
  ],
} as const satisfies GreatCourse
