import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const theMoneyWeAreLivingOn = {
  id: "01a06559-9d65-7c36-8ace-5776f5b44e37",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "the-money-we-are-living-on",
  title: "The Money We Are Living On",
  definition: "the runway we are spending down, and what I am allowed to spend it on",
  parents: ["money-bar"],
  related: ["safety-years", "living-with-jen"],
  settled:
    "All of it is shared and anything large is decided together, so none of it is mine to act on alone.\n\nIt is a runway rather than a retirement: eight to eighteen years on the markets, sustaining nothing itself.\n\nI will never be an employee again. That is a bar set on the cost of it, not a preference.\n\nTwo ways to fill the gap. I build something valuable, or the startup stock we still hold pays out.\n\nA thousand a month is for spending on my own capacity, and compute alone takes seventeen hundred.",
} as const satisfies AllAboutAlanTopic
