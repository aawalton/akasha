import type { GreatCoursesSubject } from "akasha/alan/collection/studying/great-courses-subject/great-courses-subject.page-type.types.ts"

export const philosophyAndReligionGreatCourses = {
  id: "019db533-f3a0-798e-adc6-12dadd6efe6c",
  type: "page-type/great-courses-subject",
  slug: "philosophy-and-religion-great-courses",
  title: "Philosophy & Religion Great Courses",
  status: "paused",
  unit: "unit/minutes",
  partOfCollections: ["great-courses-collection/great-courses-by-subject"],
  externalIdentity: [
    { source: "the-great-courses", externalId: "great-courses-subject-philosophy-religion" },
  ],
} as const satisfies GreatCoursesSubject
