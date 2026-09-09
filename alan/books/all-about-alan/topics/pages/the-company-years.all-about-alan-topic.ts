import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const theCompanyYears = {
  id: "01a06559-9d65-7350-9035-cb7768508c3e",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "the-company-years",
  title: "The Company Years",
  definition: "the years at the company, which I have called a special kind of hell",
  parents: ["the-chapters-of-my-life"],
  related: ["why-i-stopped-working", "what-i-let-myself-take-on"],
} as const satisfies AllAboutAlanTopic
