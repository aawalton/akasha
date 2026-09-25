import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatWorldReligionsHinduism = {
  id: "019db533-f39e-7d3a-86da-b0dc3c8ba0bc",
  type: "page-type/great-course",
  slug: "great-world-religions-hinduism",
  title: "Great World Religions: Hinduism",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 361.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-world-religions-hinduism",
      externalLink: "https://www.thegreatcoursesplus.com/great-world-religions-hinduism",
    },
  ],
} as const satisfies GreatCourse
