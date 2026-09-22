import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theChaptersOfMyLife = {
  id: "01a06559-9d65-7240-86da-528ebdd3bbd7",
  type: "page-type/all-about-alan-topic",
  slug: "the-chapters-of-my-life",
  title: "The Chapters Of My Life",
  definition: "my life written as chapters, and how much of it is still only a title",
  parents: ["all-about-alan-topic/alan"],
  related: [
    "all-about-alan-topic/the-best-three-years",
    "all-about-alan-topic/what-the-book-of-me-is-for",
  ],
  settled:
    "I keep it as three twenty-year eras: earth for childhood, fire for working adult, water for what comes next.\n\nI write it to see the shape of my own story before I set out what the next part is for.\n\nMy memory starts at four, so everything before that is somebody else's account of me.\n\nChildhood, middle school, the road trip and college carry content. The rest are titles with year ranges.\n\nExpansion, from this year on, is the live one.",
} as const satisfies AllAboutAlanTopic
