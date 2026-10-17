import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const safeWhileIManageMyCosts = {
  id: "01a14a9d-deec-737a-b346-4dd64821cbfd",
  type: "page-type/all-about-alan-topic",
  slug: "safe-while-i-manage-my-costs",
  title: "Safe While I Manage My Costs",
  definition: "my compression of what power other people hold over me",
  parents: ["all-about-alan-topic/wanting-no-one-to-have-power-over-me"],
  related: [
    "all-about-alan-topic/the-kinds-of-harm-someone-could-do-me",
    "all-about-alan-topic/when-an-unscripted-conversation-is-safe",
  ],
  settled:
    "Other people cannot harm me in a way that matters to me. As long as I am managing my costs well, I am safe.",
  createdAt: "2026-10-17T16:07:02.635Z",
  updatedAt: "2026-10-17T16:07:02.635Z",
} as const satisfies AllAboutAlanTopic
