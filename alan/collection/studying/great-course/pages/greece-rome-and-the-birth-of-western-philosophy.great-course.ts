import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greeceRomeAndTheBirthOfWesternPhilosophy = {
  id: "019db533-f398-73a1-be3a-11abd5a61343",
  type: "page-type/great-course",
  slug: "greece-rome-and-the-birth-of-western-philosophy",
  title: "Greece, Rome, and the Birth of Western Philosophy",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 726,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "greece-rome-and-the-birth-of-western-philosophy",
      externalLink:
        "https://plus.thegreatcourses.com/greece-rome-and-the-birth-of-western-philosophy",
    },
  ],
  createdAt: "2026-04-22T12:39:34.040Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
