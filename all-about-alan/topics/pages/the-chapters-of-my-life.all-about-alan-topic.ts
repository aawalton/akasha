import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const theChaptersOfMyLife = {
  id: "01a06559-9d65-7240-86da-528ebdd3bbd7",
  pageTypeSlug: "all-about-alan-topic",
  slug: "the-chapters-of-my-life",
  title: "The Chapters Of My Life",
  definition: "my life written as chapters, and how much of it is still only a title",
  parentSlugs: ["alan"],
  relatedSlugs: ["the-best-three-years", "what-the-book-of-me-is-for"],
  settled:
    "I keep it as three twenty-year eras: earth for childhood, fire for working adult, water for what comes next.\n\nI write it to see the shape of my own story before I set out what the next part is for.\n\nMy memory starts at four, so everything before that is somebody else's account of me.\n\nOnly childhood and college carry any content. The rest are titles with year ranges.\n\nExpansion, from this year on, is the live one.",
  unsettled:
    "Middle school, high school, the mission, marriage and the four working years are titles only. Each is an interview's worth I have never given.\n\nThe road trip, Nauvoo and the year of isolation are named as turns, and nothing says what happened in them.\n\nThe mission ended without my going home. How it closed, what the recovery was, and the road from there to the low in 2024 are unwritten.\n\nThe reporting I did on the mission may be where my self-instrumentation starts, and nothing connects them.",
} as const satisfies AllAboutAlanTopic
