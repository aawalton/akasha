import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEvidenceForModernPhysicsHowWeKnowWhatWeKnow = {
  id: "019db533-f39e-7b9f-b62c-5aceb92ddd14",
  type: "page-type/great-course",
  slug: "the-evidence-for-modern-physics-how-we-know-what-we-know",
  title: "The Evidence for Modern Physics: How We Know What We Know",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 712.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-evidence-for-modern-physics-how-we-know-what-we-know",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-evidence-for-modern-physics-how-we-know-what-we-know",
    },
  ],
} as const satisfies GreatCourse
