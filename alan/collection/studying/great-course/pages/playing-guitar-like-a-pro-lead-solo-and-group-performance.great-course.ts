import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const playingGuitarLikeAProLeadSoloAndGroupPerformance = {
  id: "019db533-f3a0-7288-b1f9-50806231f0d3",
  type: "page-type/great-course",
  slug: "playing-guitar-like-a-pro-lead-solo-and-group-performance",
  title: "Playing Guitar like a Pro: Lead, Solo, and Group Performance",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 763.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "playing-guitar-like-a-pro-lead-solo-and-group-performance",
      externalLink:
        "https://www.thegreatcoursesplus.com/playing-guitar-like-a-pro-lead-solo-and-group-performance",
    },
  ],
} as const satisfies GreatCourse
