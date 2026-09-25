import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theModernIntellectualTraditionFromDescartesToDerrida = {
  id: "019db533-f39e-79cb-b083-3260ab3c3ae2",
  type: "page-type/great-course",
  slug: "the-modern-intellectual-tradition-from-descartes-to-derrida",
  title: "The Modern Intellectual Tradition: From Descartes to Derrida",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1130.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-modern-intellectual-tradition-from-descartes-to-derrida",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-modern-intellectual-tradition-from-descartes-to-derrida",
    },
  ],
} as const satisfies GreatCourse
