import type { GreatCoursesSubject } from "../great-courses-subject.page-type.ts"

export const philosophyAndReligionGreatCourses = {
  id: "019db533-f3a0-798e-adc6-12dadd6efe6c",
  pageTypeSlug: "great-courses-subject",
  slug: "philosophy-and-religion-great-courses",
  title: "Philosophy & Religion Great Courses",
  status: "paused",
  unitSlug: "minutes",
  partOfSlugs: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-philosophy-religion",
} as const satisfies GreatCoursesSubject
