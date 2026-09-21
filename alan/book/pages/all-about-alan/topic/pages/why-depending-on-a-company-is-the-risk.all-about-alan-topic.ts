import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyDependingOnACompanyIsTheRisk = {
  id: "01a0c590-5b90-7f8f-8f9c-ea76896e16cb",
  type: "page-type/all-about-alan-topic",
  slug: "why-depending-on-a-company-is-the-risk",
  title: "Why Depending On A Company Is The Risk",
  definition:
    "dependence itself as the exposure, and profit pressure as what makes a service decay",
  parents: ["all-about-alan-topic/which-organisations-i-trust"],
  related: [
    "all-about-alan-topic/getting-out-from-under-a-dependency",
    "all-about-alan-topic/what-is-at-my-floor",
  ],
  settled:
    "The threat is not what a company sells me or what it charges me. It is the depending itself. Every ongoing relationship with a large organisation is an exposure I am carrying.\n\nUnder sustained profit pressure a service gets worse. That is the default path rather than the exception, and most of the larger threats I see come from there.\n\nCorporate capture has put government services on the same path. They used to sit outside the pressure and no longer reliably do, so the same test has to run on them.\n\nWhat I want is to live a good life without relying on any large organisation that has not earned that through consistent behaviour over years.\n\nNot needing a thing is not only a wall I keep between me and the world. Standing on my own is a state I reach toward and want for its own sake.",
} as const satisfies AllAboutAlanTopic
