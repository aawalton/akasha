import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whenIStopReadingAGauge = {
  id: "01a0c5a6-3fc2-712c-a791-c65ff4f5f916",
  type: "page-type/all-about-alan-topic",
  slug: "when-i-stop-reading-a-gauge",
  title: "When I Stop Reading A Gauge",
  definition: "an instrument falling idle because a cheaper rule is holding the line instead",
  parents: ["all-about-alan-topic/how-well-i-can-measure"],
  related: ["all-about-alan-topic/what-an-activity-costs-me"],
  settled:
    "My stress level is the most mature reading I have, twenty years old and on a real number, and I have not been reading it for weeks.\n\nMy rule about what I can afford has been enough on its own.\n\nThe bottleneck did not go away. The rule keeps me far enough off the limit that the needle does not move, so sampling it adds nothing.\n\nWhat changed is the direction. I was reading the real stress against the gauge. Now I trust the cost model and the cap and do not look.\n\nThis is not the bar slipping down the ladder. The anchors are intact and the resolution is the same. The gauge is simply not being read, because something cheaper is holding the line in its place.",
} as const satisfies AllAboutAlanTopic
