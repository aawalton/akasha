import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureTheArtOfLeadershipAbrahamLincoln = {
  id: "019db533-f3a0-72ab-a8e3-24e1c391ffb0",
  type: "page-type/great-course",
  slug: "pilot-lecture-the-art-of-leadership-abraham-lincoln",
  title: "Pilot Lecture: The Art of Leadership—Abraham Lincoln",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 31.2,
  ownProgress: 31.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pilot-lecture-the-art-of-leadership-abraham-lincoln",
      externalLink:
        "https://www.thegreatcoursesplus.com/pilot-lecture-the-art-of-leadership-abraham-lincoln",
    },
  ],
} as const satisfies GreatCourse
