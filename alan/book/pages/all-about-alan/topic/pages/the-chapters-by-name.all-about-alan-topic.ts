import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theChaptersByName = {
  id: "01a0c5a9-8f6e-7798-b391-6a2bb0eacf71",
  type: "page-type/all-about-alan-topic",
  slug: "the-chapters-by-name",
  title: "The Chapters By Name",
  definition: "the chapter headings I have set down and the years each one covers",
  parents: ["all-about-alan-topic/the-chapters-of-my-life"],
  related: [
    "all-about-alan-topic/the-best-three-years",
    "all-about-alan-topic/the-nine-months-my-body-broke",
  ],
  settled:
    "Earth runs a prologue before memory, 1986 to 1989, then preschool 1990 to 1991, elementary 1992 to 1997, middle school 1998 to 1999, a road trip in the autumn of 1999, high school 2000 to 2002, college 2003 to 2005, and Nauvoo in the autumn of 2005.\n\nFire runs the mission 2006 to 2007, marriage 2008 to 2009, Epic 2010 to 2013, Degreed 2014 to 2017, VidAngel 2018 to 2019, Latitude 2020 to 2024, and a year of isolation in 2025.\n\nWater opens with Expansion, from 2026, with no end year on it.\n\nThe ranges put my birth at about 1986.",
} as const satisfies AllAboutAlanTopic
