import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureBuildingAWebsiteWithHtmlAndCss = {
  id: "019db533-f39e-75d2-a5b1-cb0f464aa25e",
  type: "page-type/great-course",
  slug: "pilot-lecture-building-a-website-with-html-and-css",
  title: "Pilot Lecture: Building a Website with HTML and CSS",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 25.2,
  ownProgress: 25.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "plus-pilots-building-a-website-with-html-and-css",
      externalLink:
        "https://www.thegreatcoursesplus.com/plus-pilots-building-a-website-with-html-and-css",
    },
  ],
} as const satisfies GreatCourse
