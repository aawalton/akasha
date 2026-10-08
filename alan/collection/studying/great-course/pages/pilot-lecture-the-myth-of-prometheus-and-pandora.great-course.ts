import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureTheMythOfPrometheusAndPandora = {
  id: "019db533-f39f-797d-a4dd-8c2b268db9b2",
  type: "page-type/great-course",
  slug: "pilot-lecture-the-myth-of-prometheus-and-pandora",
  title: "Pilot Lecture: The Myth of Prometheus and Pandora",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 29.4,
  ownProgress: 29.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pilot-lecture-the-myth-of-prometheus-and-pandora",
      externalLink:
        "https://www.thegreatcoursesplus.com/pilot-lecture-the-myth-of-prometheus-and-pandora",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
