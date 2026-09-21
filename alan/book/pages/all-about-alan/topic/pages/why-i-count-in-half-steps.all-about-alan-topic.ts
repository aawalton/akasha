import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyICountInHalfSteps = {
  id: "01a0c5a6-81c3-7c67-be53-c84c1eaef10d",
  type: "page-type/all-about-alan-topic",
  slug: "why-i-count-in-half-steps",
  title: "Why I Count In Half Steps",
  definition: "what the half step on my scales is, and why the scale is rastered at that size",
  parents: ["all-about-alan-topic/how-well-i-can-measure"],
  related: [
    "all-about-alan-topic/the-rungs-of-my-safety-scale",
    "all-about-alan-topic/how-hard-a-thing-counts-as",
  ],
  settled:
    "The half step is not a special unit. It is the finest distance I can reliably tell apart.\n\nThe load underneath is continuous. My scale is calibrated to what I can discriminate along it, so a half step is the just-noticeable difference of my own perception of it.\n\nThat is why two ways of writing the same thing do not actually disagree. Adding one for conflict onto a social base of three, and reading conflict off directly as a base tier of four, are the same continuous variable rastered at the half step from two directions. Neither is the underlying quantity.\n\nIt is also why an activity can sit at three and a half or four and a half. The load falls between my integer anchors and I resolve it to the nearest half step.",
} as const satisfies AllAboutAlanTopic
