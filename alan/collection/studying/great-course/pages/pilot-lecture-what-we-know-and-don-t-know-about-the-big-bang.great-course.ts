import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureWhatWeKnowAndDonTKnowAboutTheBigBang = {
  id: "019db533-f39e-7c19-91bd-e166f6057e5a",
  type: "page-type/great-course",
  slug: "pilot-lecture-what-we-know-and-don-t-know-about-the-big-bang",
  title: "Pilot Lecture: What We Know (and Don’t Know) about the Big Bang",
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
      externalId: "plus-pilots-what-we-know-and-dont-know-about-the-big-bang",
      externalLink:
        "https://www.thegreatcoursesplus.com/plus-pilots-what-we-know-and-dont-know-about-the-big-bang",
    },
  ],
} as const satisfies GreatCourse
