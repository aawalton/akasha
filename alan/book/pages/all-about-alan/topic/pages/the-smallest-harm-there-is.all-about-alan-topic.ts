import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theSmallestHarmThereIs = {
  id: "01a0c5a0-b45d-70b6-8a5b-e9443eeaa3bb",
  type: "page-type/all-about-alan-topic",
  slug: "the-smallest-harm-there-is",
  title: "The Smallest Harm There Is",
  definition: "one discrete tick as the atomic harm, so nothing is left to carving",
  parents: ["all-about-alan-topic/the-two-oracles-my-ethics-assumes"],
  related: ["all-about-alan-topic/the-formula-that-prices-a-harm"],
  settled:
    "I take the universe to be fundamentally discrete, grained at the Planck scale in time, distance and energy. That hands the framework a canonical event for free.\n\nThe atomic harm is the drop in an individual's probability-weighted expected value across a single tick. The sub-game for that harm is every agent's contribution to that particular drop, summed across all of history and every branch continuous with that instant.\n\nSo nothing is left to carving. The tick is the finest grain there is, a harm cannot be divided below it, and every actor judged against a harm faces the same sub-game. Consent scoring comes out actor-independent.\n\nA harm spanning many ticks is the linear sum of the per-tick sub-games, so aggregating over an interval and decomposing it give identical answers.",
} as const satisfies AllAboutAlanTopic
