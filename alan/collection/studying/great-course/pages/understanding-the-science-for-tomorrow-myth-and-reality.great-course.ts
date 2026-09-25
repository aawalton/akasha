import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheScienceForTomorrowMythAndReality = {
  id: "019db533-f39e-7d5e-9c27-5c2ad1ded3c9",
  type: "page-type/great-course",
  slug: "understanding-the-science-for-tomorrow-myth-and-reality",
  title: "Understanding the Science for Tomorrow: Myth and Reality",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 713.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-science-for-tomorrow-myth-and-reality",
      externalLink:
        "https://www.thegreatcoursesplus.com/understanding-the-science-for-tomorrow-myth-and-reality",
    },
  ],
} as const satisfies GreatCourse
