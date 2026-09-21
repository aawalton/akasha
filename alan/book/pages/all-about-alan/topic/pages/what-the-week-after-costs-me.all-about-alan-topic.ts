import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatTheWeekAfterCostsMe = {
  id: "01a0c59b-803e-7967-96a6-811aaee8c273",
  type: "page-type/all-about-alan-topic",
  slug: "what-the-week-after-costs-me",
  title: "What The Week After Costs Me",
  definition: "where the cost of an exposure is actually paid, and what shortens the tail",
  parents: ["all-about-alan-topic/after-something-alarms-me"],
  related: ["all-about-alan-topic/sleep"],
  settled:
    "An exposure that lasts minutes can suppress my safety for a week. Most of what it costs me is not the exposure itself. It is paid out across the vigilance period afterwards.\n\nMy default protocol is passive waiting plus sleep.\n\nWhat speeds the decay up is concrete evidence to my own mind that the source is contained. Deleting the app that delivered the exposure. Blocking the source. A ritual that closes the channel.",
} as const satisfies AllAboutAlanTopic
