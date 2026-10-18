import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const takeMyCoursePleaseThePhilosophyOfHumor = {
  id: "019db533-f3a0-7614-a1a4-5ba5371033b2",
  type: "page-type/great-course",
  slug: "take-my-course-please-the-philosophy-of-humor",
  title: "Take My Course, Please! The Philosophy of Humor",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 702.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "take-my-course-please-the-philosophy-of-humor",
      externalLink:
        "https://plus.thegreatcourses.com/take-my-course-please-the-philosophy-of-humor",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
