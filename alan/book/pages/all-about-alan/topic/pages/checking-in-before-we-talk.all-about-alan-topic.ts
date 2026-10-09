import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const checkingInBeforeWeTalk = {
  id: "01a1227a-2faa-7d68-ab6c-da490485e961",
  type: "page-type/all-about-alan-topic",
  slug: "checking-in-before-we-talk",
  title: "Checking In Before We Talk",
  definition: "Jen and I asking how each other is doing before a conversation starts",
  parents: ["all-about-alan-topic/living-with-jen"],
  related: [
    "all-about-alan-topic/showing-jen-where-i-am",
    "all-about-alan-topic/how-a-hard-talk-with-jen-gets-safer",
    "all-about-alan-topic/the-talk-about-her-health-on-9-october-2026",
  ],
  settled:
    "In past conversations we have repeatedly agreed that we should check in on how we are doing before having a conversation. I even built her a mobile app so she can see my level as a widget on her phone.\n\nI think she tells herself she is just going to have a quick interaction, not a conversation. But quick interactions almost always fill whatever space is available for them. So the end result is not checking in until she is seeing signs of damage. That is better than nothing, but by definition it is too late to avoid the damage.\n\nI feel a little hurt about it.",
  createdAt: "2026-10-09T21:03:15.369Z",
  updatedAt: "2026-10-09T21:03:15.369Z",
} as const satisfies AllAboutAlanTopic
