import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theScientificGuideToHealthAndHappiness = {
  id: "019db533-f3a0-7629-9a53-0781a86cdf7d",
  type: "page-type/great-course",
  slug: "the-scientific-guide-to-health-and-happiness",
  title: "The Scientific Guide to Health and Happiness",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 594.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-scientific-guide-to-health-and-happiness",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-scientific-guide-to-health-and-happiness",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
