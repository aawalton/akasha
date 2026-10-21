import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const jenReadingAloud = {
  id: "01a15eb5-c0b4-7ba4-9ac7-79635f5d59ac",
  type: "page-type/all-about-alan-topic",
  slug: "jen-reading-aloud",
  title: "Jen Reading Aloud",
  definition: "whether Jen would enjoy reading aloud to me",
  parents: ["all-about-alan-topic/the-tests-for-what-could-feed-the-child"],
  related: ["all-about-alan-topic/how-jen-connects-through-words"],
  settled:
    "I do not think Jen would enjoy reading aloud to me. I think she is still self-conscious about reading out loud. I am pretty sure she has some undiagnosed dyslexia.",
  createdAt: "2026-10-21T13:45:32.083Z",
  updatedAt: "2026-10-21T13:45:32.083Z",
} as const satisfies AllAboutAlanTopic
