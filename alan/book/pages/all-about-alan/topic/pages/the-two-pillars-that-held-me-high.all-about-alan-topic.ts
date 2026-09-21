import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theTwoPillarsThatHeldMeHigh = {
  id: "01a0c598-82c8-769d-b72e-85ecc07f509f",
  type: "page-type/all-about-alan-topic",
  slug: "the-two-pillars-that-held-me-high",
  title: "The Two Pillars That Held Me High",
  definition: "the two things that made my safety high in college and whose loss dropped it",
  parents: ["all-about-alan-topic/the-best-three-years"],
  related: [
    "all-about-alan-topic/the-nine-months-my-body-broke",
    "all-about-alan-topic/where-safety-has-got-to",
    "all-about-alan-topic/how-safety-climbs",
  ],
  settled:
    "Two things made the difference between then and now. I had autonomy, and my nervous system was undamaged.\n\nEverything was self-chosen then, and that is what held my safety high.\n\nI started noticing the nervous system damage right before I turned twenty, on the mission. That is the window where the second pillar broke, and the compounding decline ran from there for eighteen years.\n\nThe mission took the first pillar as well. Structure replaced self-direction.\n\nBoth fell in the same era, which is why the cheap world I had been reading did not survive it.",
} as const satisfies AllAboutAlanTopic
