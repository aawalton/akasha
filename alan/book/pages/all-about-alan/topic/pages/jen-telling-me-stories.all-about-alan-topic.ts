import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const jenTellingMeStories = {
  id: "01a15eb6-9bcf-7743-8028-6714343ee2a7",
  type: "page-type/all-about-alan-topic",
  slug: "jen-telling-me-stories",
  title: "Jen Telling Me Stories",
  definition: "whether Jen telling me stories while I listen could feed the Child",
  parents: ["all-about-alan-topic/the-tests-for-what-could-feed-the-child"],
  related: [
    "all-about-alan-topic/jen-reading-aloud",
    "all-about-alan-topic/how-jen-connects-through-words",
  ],
  settled:
    "Jen does like telling stories. But part of the telling is getting appropriate responses, and that activates the Professor for me.",
  createdAt: "2026-10-21T13:46:28.174Z",
  updatedAt: "2026-10-21T13:46:28.174Z",
} as const satisfies AllAboutAlanTopic
