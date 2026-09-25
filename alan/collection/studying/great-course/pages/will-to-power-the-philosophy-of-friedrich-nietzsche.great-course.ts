import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const willToPowerThePhilosophyOfFriedrichNietzsche = {
  id: "019db533-f387-7f18-87ad-84cadc2cd044",
  type: "page-type/great-course",
  slug: "will-to-power-the-philosophy-of-friedrich-nietzsche",
  title: "Will to Power: The Philosophy of Friedrich Nietzsche",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 729.433333,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "will-to-power-the-philosophy-of-friedrich-nietzsche",
      externalLink:
        "https://www.thegreatcoursesplus.com/will-to-power-the-philosophy-of-friedrich-nietzsche",
    },
  ],
} as const satisfies GreatCourse
