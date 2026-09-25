import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureEthicalHealthCareInTheAgeOfAi = {
  id: "019db533-f39e-7409-855c-0c3f9e59d684",
  type: "page-type/great-course",
  slug: "pilot-lecture-ethical-health-care-in-the-age-of-ai",
  title: "Pilot Lecture: Ethical Health Care in the Age of AI",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 30,
  ownProgress: 30,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "plus-pilots-ethical-health-care-in-the-age-of-ai",
      externalLink:
        "https://www.thegreatcoursesplus.com/plus-pilots-ethical-health-care-in-the-age-of-ai",
    },
  ],
} as const satisfies GreatCourse
