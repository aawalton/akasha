import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const earlyModernPhilosophyDescartesAndTheRationalists = {
  id: "019db533-f39e-7cdd-b34a-94894bc767de",
  type: "page-type/great-course",
  slug: "early-modern-philosophy-descartes-and-the-rationalists",
  title: "Early Modern Philosophy: Descartes and the Rationalists",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 375.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "early-modern-philosophy-descartes-and-the-rationalists",
      externalLink:
        "https://www.thegreatcoursesplus.com/early-modern-philosophy-descartes-and-the-rationalists",
    },
  ],
} as const satisfies GreatCourse
