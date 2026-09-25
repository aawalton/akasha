import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const taiChiFitnessWorkouts = {
  id: "019db533-f3a0-7694-a693-ee0a1a59b698",
  type: "page-type/great-course",
  slug: "tai-chi-fitness-workouts",
  title: "Tai Chi Fitness Workouts",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 304.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "tai-chi-fitness-workouts",
      externalLink: "https://www.thegreatcoursesplus.com/tai-chi-fitness-workouts",
    },
  ],
} as const satisfies GreatCourse
