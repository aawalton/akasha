import type { GreatCourse } from "../../great-course.page-type.ts"

export const taiChiFitnessWorkouts = {
  id: "019db533-f3a0-7694-a693-ee0a1a59b698",
  pageTypeSlug: "great-course",
  slug: "tai-chi-fitness-workouts",
  title: "Tai Chi Fitness Workouts",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 304.8,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "health-and-mindfulness-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "tai-chi-fitness-workouts",
  externalLink: "https://www.thegreatcoursesplus.com/tai-chi-fitness-workouts",
} as const satisfies GreatCourse
