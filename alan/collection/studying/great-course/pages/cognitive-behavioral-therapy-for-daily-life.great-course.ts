import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const cognitiveBehavioralTherapyForDailyLife = {
  id: "019db533-f3a0-7944-bedd-0ec833f0a32f",
  type: "page-type/great-course",
  slug: "cognitive-behavioral-therapy-for-daily-life",
  title: "Cognitive Behavioral Therapy for Daily Life",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 733.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/professional-growth-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "cognitive-behavioral-therapy-for-daily-life",
      externalLink:
        "https://www.thegreatcoursesplus.com/cognitive-behavioral-therapy-for-daily-life",
    },
  ],
} as const satisfies GreatCourse
