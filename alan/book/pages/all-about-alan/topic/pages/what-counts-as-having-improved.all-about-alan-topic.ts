import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatCountsAsHavingImproved = {
  id: "01a0c592-808f-7f62-a3a8-2aab54222947",
  type: "page-type/all-about-alan-topic",
  slug: "what-counts-as-having-improved",
  title: "What Counts As Having Improved",
  definition: "improving as a comparison between an earlier me and a later one",
  parents: ["all-about-alan-topic/self-improvement"],
  related: [
    "all-about-alan-topic/what-kind-of-thing-a-self-is",
    "all-about-alan-topic/the-three-seconds-i-am",
  ],
  settled:
    "Conceptual improvement means a later immediate me on the timeline holds a map better aligned with absolute truth than an earlier one held.\n\nSo improving is a property of the comparison across immediate selves rather than anything any one of them has.\n\nA single frame cannot improve. Improving needs a before and an after, and a frame is only ever the present.\n\nIt is done to no frame. It is a relation between frames, which puts it at the closure rather than at the frame.\n\nWhat improves over a lifetime is the timeline self, and improving means its later frames carry truer maps than its earlier ones.",
} as const satisfies AllAboutAlanTopic
