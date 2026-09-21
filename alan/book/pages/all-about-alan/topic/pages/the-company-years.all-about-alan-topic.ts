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
  settled:
    "A company never runs out of steps. It is open-ended, it is never finished, and it never waits.\n\nSo it held me in responsibility permanently and everywhere at once, for the whole span of it. That is the special kind of hell.\n\nNothing I did across those years could be enjoyed for its own sake, because nothing under a held responsibility can be.\n\nIt is a large part of why I am not allowed to take responsibility for things now.\n",
} as const satisfies AllAboutAlanTopic
