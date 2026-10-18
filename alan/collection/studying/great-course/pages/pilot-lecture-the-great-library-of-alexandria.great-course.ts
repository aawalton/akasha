import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureTheGreatLibraryOfAlexandria = {
  id: "019db533-f389-70f1-b797-d5772f0ef7a6",
  type: "page-type/great-course",
  slug: "pilot-lecture-the-great-library-of-alexandria",
  title: "Pilot Lecture: The Great Library of Alexandria",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 34.3,
  ownProgress: 34.3,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pilot-lecture-the-great-library-of-alexandria",
      externalLink:
        "https://plus.thegreatcourses.com/pilot-lecture-the-great-library-of-alexandria",
    },
  ],
  createdAt: "2026-04-22T12:39:34.025Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
