import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyIWantASimplerMachine = {
  id: "01a0c59b-e328-73f6-979d-4da4e1b98a22",
  type: "page-type/all-about-alan-topic",
  slug: "why-i-want-a-simpler-machine",
  title: "Why I Want A Simpler Machine",
  definition: "choosing on durability and maintainability, as a way of staying free",
  parents: ["all-about-alan-topic/the-car-i-will-buy-next"],
  related: ["all-about-alan-topic/getting-out-from-under-a-dependency"],
  settled:
    "I choose older and simpler over newer and full of features, and I want repair knowledge and parts already out in the world.\n\nA new machine runs on the maker's software, its updates over the air and its own diagnostic tools. That is a hold the maker keeps. It can switch the thing off, brick it, or change it from a distance without asking me.\n\nAn older simpler design cuts that back to mechanics, which an independent shop can actually work on.\n\nSo the rule is about staying free rather than about spending less. Every feature a maker adds is more of me it can reach later.",
} as const satisfies AllAboutAlanTopic
