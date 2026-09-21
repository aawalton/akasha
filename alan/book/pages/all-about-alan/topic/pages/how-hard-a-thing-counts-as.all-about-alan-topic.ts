import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howHardAThingCountsAs = {
  id: "01a0c5a5-fcbd-7ef0-8299-8f38014cf95d",
  type: "page-type/all-about-alan-topic",
  slug: "how-hard-a-thing-counts-as",
  title: "How Hard A Thing Counts As",
  definition: "the difficulty number I put on an activity before pricing it",
  parents: ["all-about-alan-topic/what-an-activity-costs-me"],
  related: [
    "all-about-alan-topic/the-rungs-of-my-safety-scale",
    "all-about-alan-topic/what-comes-back-into-reach-as-i-climb",
  ],
  settled:
    "Every kind of interaction has a base tier, which is the safety level where it costs me exactly one times.\n\nEntertainment is one. Programming is two. Social interaction is three. Conflict is four. Criticism is five.\n\nFor a social interaction specifically I build the number up instead. It starts at three. Add one for conflict. Add one for criticism. Add the base-two logarithm of the number of people involved.\n\nHalf steps are measurable for partial cases and for more extreme ones.\n\nThe two ways of getting there agree. Building up from the social base of three with offsets, and reading conflict off as four and criticism as five, label the same points from different directions.",
} as const satisfies AllAboutAlanTopic
