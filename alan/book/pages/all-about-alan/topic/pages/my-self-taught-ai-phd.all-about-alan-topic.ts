import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const mySelfTaughtAiPhd = {
  id: "01a0c647-6dce-78c7-b00a-87b1c410a115",
  type: "page-type/all-about-alan-topic",
  slug: "my-self-taught-ai-phd",
  title: "My Self-Taught AI PhD",
  definition: "the AI education I am running myself, with no judge on it",
  parents: ["all-about-alan-topic/being-an-inventor-not-a-coder"],
  related: [
    "all-about-alan-topic/the-money-arrangement-we-settled-on",
    "all-about-alan-topic/what-i-spend-on-compute",
    "all-about-alan-topic/how-i-came-out-of-computer-science",
  ],
  settled:
    "I am doing a self-taught AI PhD.\n\nThere is no judge on it. It is lots of focused learning.\n\nA hundred and thirty-five thousand is allocated to it, a balance I draw down until I am net positive on cash flow. There is a clock on it, but it is generous enough that I do not have to think about it for years.",
} as const satisfies AllAboutAlanTopic
