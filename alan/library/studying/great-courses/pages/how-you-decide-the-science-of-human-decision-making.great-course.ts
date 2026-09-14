import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const howYouDecideTheScienceOfHumanDecisionMaking = {
  id: "019db533-f39e-7cc5-9ea5-43896df8456a",
  type: "great-course",
  slug: "how-you-decide-the-science-of-human-decision-making",
  title: "How You Decide: The Science of Human Decision Making",
  status: "not-started",
  unit: "minutes",
  ownLength: 715.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-you-decide-the-science-of-human-decision-making",
      externalLink:
        "https://www.thegreatcoursesplus.com/how-you-decide-the-science-of-human-decision-making",
    },
  ],
} as const satisfies GreatCourse
