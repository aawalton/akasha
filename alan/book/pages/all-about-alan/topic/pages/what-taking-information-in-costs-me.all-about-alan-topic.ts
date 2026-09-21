import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatTakingInformationInCostsMe = {
  id: "01a0c5a7-ac13-7e1a-bc2e-718a6b7a5eaf",
  type: "page-type/all-about-alan-topic",
  slug: "what-taking-information-in-costs-me",
  title: "What Taking Information In Costs Me",
  definition: "the four dependencies consuming makes, even where no money changes hands",
  parents: ["all-about-alan-topic/my-information-diet"],
  related: ["all-about-alan-topic/how-much-attention-i-have"],
  settled:
    "Attention. A feed and its notifications compete for what I have to think with, and shape what I end up attending to. The platform is the vendor and my attention is the price.\n\nOutrage. News and political pipelines turn events into emotional spikes that build up over time. They sell engagement, and it costs me load and a drift in how I am disposed.\n\nLoad. Long podcasts and dense reading take time and processing. They sell content, and it costs the capacity that would have gone somewhere else.\n\nThe platform. Where I take a thing in is a dependency on top of what I take in, and good content arriving through a captured platform takes on that platform's grade.\n\nStopping takes all four away at once. Switching provider touches only the last of them, and the first three carry on whoever is delivering.",
} as const satisfies AllAboutAlanTopic
