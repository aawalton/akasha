import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheDarkSideOfHumanNature = {
  id: "019db533-f39e-79f5-b52c-cf038be581f1",
  type: "page-type/great-course",
  slug: "understanding-the-dark-side-of-human-nature",
  title: "Understanding the Dark Side of Human Nature",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 740.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-dark-side-of-human-nature",
      externalLink:
        "https://www.thegreatcoursesplus.com/understanding-the-dark-side-of-human-nature",
    },
  ],
} as const satisfies GreatCourse
