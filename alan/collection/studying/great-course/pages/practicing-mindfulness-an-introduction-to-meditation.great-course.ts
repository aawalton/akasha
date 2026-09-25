import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const practicingMindfulnessAnIntroductionToMeditation = {
  id: "019db533-f3a0-7830-ab51-84b2b97413be",
  type: "page-type/great-course",
  slug: "practicing-mindfulness-an-introduction-to-meditation",
  title: "Practicing Mindfulness: An Introduction to Meditation",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 750,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "practicing-mindfulness-an-introduction-to-meditation",
      externalLink:
        "https://www.thegreatcoursesplus.com/practicing-mindfulness-an-introduction-to-meditation",
    },
  ],
} as const satisfies GreatCourse
