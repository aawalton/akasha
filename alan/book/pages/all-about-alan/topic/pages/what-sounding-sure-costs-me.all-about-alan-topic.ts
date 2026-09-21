import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatSoundingSureCostsMe = {
  id: "01a0c607-9ae7-7d1b-ab52-6d416f0a8541",
  type: "page-type/all-about-alan-topic",
  slug: "what-sounding-sure-costs-me",
  title: "What Sounding Sure Costs Me",
  definition: "the conflict my flat phrasing draws, and the preamble I use to head it off",
  parents: ["all-about-alan-topic/why-i-sound-surer-than-i-am"],
  related: [
    "all-about-alan-topic/what-criticism-does-to-me",
    "all-about-alan-topic/the-five-ways-something-becomes-automatic",
  ],
  settled:
    "The cost is conflict-shaped. A listener with a competing position reads the flat assertion as a challenge, gets defensive, and it escalates.\n\nConflict sits at the fourth tier of my stress costs, far above where I usually run, so one phrasing trigger compounds into a very high cost, and the conflict gets encoded as a threat.\n\nWhere confidence is welcome the gap is a feature. What I learned early was closer to charm than tact; charm runs on confidence, and tact would have needed hedging.",
} as const satisfies AllAboutAlanTopic
