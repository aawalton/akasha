import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theCompanyYears = {
  id: "01a06559-9d65-7350-9035-cb7768508c3e",
  type: "page-type/all-about-alan-topic",
  slug: "the-company-years",
  title: "The Company Years",
  definition: "the years at the company, which I have called a special kind of hell",
  parents: ["all-about-alan-topic/the-chapters-of-my-life"],
  related: [
    "all-about-alan-topic/why-i-stopped-working",
    "all-about-alan-topic/what-i-let-myself-take-on",
  ],
} as const satisfies AllAboutAlanTopic
