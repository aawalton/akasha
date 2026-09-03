import type { GreatCourse } from "../../great-course.page-type.ts"

export const theGreatCoursesProfessorsRememberStephenHawking = {
  id: "019db533-f39e-7d6e-b510-3ab5bf34c13e",
  pageTypeSlug: "great-course",
  slug: "the-great-courses-professors-remember-stephen-hawking",
  title: "The Great Courses Professors Remember Stephen Hawking",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 12,
  ownProgress: 12,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "the-great-courses-professors-remember-stephen-hawking",
  externalLink:
    "https://www.thegreatcoursesplus.com/the-great-courses-professors-remember-stephen-hawking",
} as const satisfies GreatCourse
