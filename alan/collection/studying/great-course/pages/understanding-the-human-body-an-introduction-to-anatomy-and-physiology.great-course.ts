import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheHumanBodyAnIntroductionToAnatomyAndPhysiology = {
  id: "019db533-f3a0-769e-a215-2eecc3547a5b",
  type: "page-type/great-course",
  slug: "understanding-the-human-body-an-introduction-to-anatomy-and-physiology",
  title: "Understanding the Human Body: An Introduction to Anatomy and Physiology, 2nd Edition",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 1453.8,
  ownProgress: 90.8625,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId:
        "understanding-the-human-body-an-introduction-to-anatomy-and-physiology-2nd-edition",
      externalLink:
        "https://www.thegreatcoursesplus.com/understanding-the-human-body-an-introduction-to-anatomy-and-physiology-2nd-edition",
    },
  ],
} as const satisfies GreatCourse
