import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureNeutronStarsAndPulsars = {
  id: "019db533-f39e-7f43-9d3e-6754e80f9559",
  type: "page-type/great-course",
  slug: "pilot-lecture-neutron-stars-and-pulsars",
  title: "Pilot Lecture: Neutron Stars and Pulsars",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 27,
  ownProgress: 27,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "neutron-stars-and-pulsars",
      externalLink: "https://plus.thegreatcourses.com/neutron-stars-and-pulsars",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
