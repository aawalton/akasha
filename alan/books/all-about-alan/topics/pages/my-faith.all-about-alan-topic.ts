import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const myFaith = {
  id: "01a06559-9d65-7f49-8183-aaece34682ab",
  pageTypeSlug: "all-about-alan-topic",
  slug: "my-faith",
  title: "My Faith",
  definition: "what I believe about God and the church, and how I hold it",
  parentSlugs: ["alan"],
  settled:
    "I hold it as a conclusion I reasoned my way to, not as a relationship I feel.\n\nThe reasoning has carried the faith the whole time, including the years the feeling was still running.\n\nFeeling never got a vote on the verdict.",
  unsettled:
    "Whether the reasoning strengthened as the feeling went dark, one side taking the load as the other failed, is untested. The dig into the foundations at BYU sits in the same window, around twenty.",
} as const satisfies AllAboutAlanTopic
