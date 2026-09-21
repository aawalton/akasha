import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const myFaith = {
  id: "01a06559-9d65-7f49-8183-aaece34682ab",
  type: "page-type/all-about-alan-topic",
  slug: "my-faith",
  title: "My Faith",
  definition: "what I believe about God and the church, and how I hold it",
  parents: ["all-about-alan-topic/alan"],
  settled:
    "I hold it as a conclusion I reasoned my way to, not as a relationship I feel.\n\nThe reasoning has carried the faith the whole time, including the years the feeling was still running.\n\nFeeling never got a vote on the verdict.\n\nMost members of my church rest their faith on feeling. They pray and feel that it is true. That route is shut to me, so I took the one that was open and approached my faith like everything else in my life, as an object of reason.",
} as const satisfies AllAboutAlanTopic
