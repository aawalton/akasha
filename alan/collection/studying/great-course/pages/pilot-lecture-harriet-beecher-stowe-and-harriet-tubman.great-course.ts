import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureHarrietBeecherStoweAndHarrietTubman = {
  id: "019db533-f39f-7e03-a5ef-744fa6e0fe2c",
  type: "page-type/great-course",
  slug: "pilot-lecture-harriet-beecher-stowe-and-harriet-tubman",
  title: "Pilot Lecture: Harriet Beecher Stowe and Harriet Tubman",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 36.6,
  ownProgress: 36.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "harriet-beecher-stowe-and-harriet-tubman",
      externalLink: "https://www.thegreatcoursesplus.com/harriet-beecher-stowe-and-harriet-tubman",
    },
  ],
} as const satisfies GreatCourse
