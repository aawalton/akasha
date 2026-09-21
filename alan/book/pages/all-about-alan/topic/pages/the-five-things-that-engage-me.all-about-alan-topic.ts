import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theFiveThingsThatEngageMe = {
  id: "01a0c5a1-49d6-7a11-8a9d-4361b2d1bb41",
  type: "page-type/all-about-alan-topic",
  slug: "the-five-things-that-engage-me",
  title: "The Five Things That Engage Me",
  definition: "the standard five conditions for an ADHD mind, and how mine come apart",
  parents: ["all-about-alan-topic/what-pulls-me-into-doing-something"],
  related: [
    "all-about-alan-topic/when-something-starts-to-mean-something",
    "all-about-alan-topic/what-other-peoples-kindness-does",
  ],
  settled:
    "The clinical list is interest, novelty, challenge, urgency and passion. Interest is the umbrella the other four sit under.\n\nNovelty and urgency are instinctive in me. Challenge is conceptual: a judgment that a thing is worth my attention rather than anything felt.\n\nPassion assumes a steady felt pull that I do not have, so in me it comes apart into three.\n\nImportance is conceptual and shaped like an obligation: I need to do this. Valuable is conceptual and internal: this matters to me.\n\nInvestment is neither of those. It is a multiplier on cost, written by meeting a thing over and over while I was safe.\n\nWhen I say something is meaningful I am not naming a feeling. It is a readout of which of the five are firing and how hard, so the question decomposes. At college it was challenge doing the work.\n\nThat is the kind of signal a mind this short of affect can pick up at all. It is closer to a status light than to a feeling.",
} as const satisfies AllAboutAlanTopic
