import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theScienceOfNaturalHealing = {
  id: "019db533-f3a0-76e8-abe3-35f8ce7e490e",
  type: "page-type/great-course",
  slug: "the-science-of-natural-healing",
  title: "The Science of Natural Healing",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 725.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-science-of-natural-healing",
      externalLink: "https://www.thegreatcoursesplus.com/the-science-of-natural-healing",
    },
  ],
} as const satisfies GreatCourse
