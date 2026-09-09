import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const theChaptersOfMyLife = {
  id: "01a06559-9d65-7240-86da-528ebdd3bbd7",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "the-chapters-of-my-life",
  title: "The Chapters Of My Life",
  definition: "my life written as chapters, and how much of it is still only a title",
  parents: ["alan"],
  related: ["the-best-three-years", "what-the-book-of-me-is-for"],
  settled:
    "I keep it as three twenty-year eras: earth for childhood, fire for working adult, water for what comes next.\n\nI write it to see the shape of my own story before I set out what the next part is for.\n\nMy memory starts at four, so everything before that is somebody else's account of me.\n\nOnly childhood and college carry any content. The rest are titles with year ranges.\n\nExpansion, from this year on, is the live one.",
} as const satisfies AllAboutAlanTopic
