import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mastersOfGreekThoughtPlatoSocratesAndAristotle = {
  id: "019db533-f39e-7a8c-94f7-e5a2843650f7",
  type: "page-type/great-course",
  slug: "masters-of-greek-thought-plato-socrates-and-aristotle",
  title: "Masters of Greek Thought: Plato, Socrates, and Aristotle",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1095,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "masters-of-greek-thought-plato-socrates-and-aristotle",
      externalLink:
        "https://www.thegreatcoursesplus.com/masters-of-greek-thought-plato-socrates-and-aristotle",
    },
  ],
} as const satisfies GreatCourse
