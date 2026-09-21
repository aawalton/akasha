import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatTheAiDoesAroundTheHouse = {
  id: "01a0c5a0-5b0b-7a8b-84c3-1d0d7bc87c4b",
  type: "page-type/all-about-alan-topic",
  slug: "what-the-ai-does-around-the-house",
  title: "What The AI Does Around The House",
  definition: "the skills it raises for me outside my own work, and what losing it would cost",
  parents: ["all-about-alan-topic/what-i-spend-on-compute"],
  related: ["all-about-alan-topic/the-software-i-pay-for-every-month"],
  settled:
    "It is not only for building things. It lifts what I can do across everything the household runs into: cooking, medical questions, money, the car, repairs, the garden, textiles, negotiating.\n\nIf it went, nothing would stop outright. Each of those would fall back to what I am on my own, which in most of them is an amateur.\n\nThe fall is graceful and it is large.",
} as const satisfies AllAboutAlanTopic
