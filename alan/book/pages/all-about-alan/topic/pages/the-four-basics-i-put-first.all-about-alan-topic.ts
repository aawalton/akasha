import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theFourBasicsIPutFirst = {
  id: "01a0c591-db97-79a5-ba4a-134b6d3708a9",
  type: "page-type/all-about-alan-topic",
  slug: "the-four-basics-i-put-first",
  title: "The Four Basics I Put First",
  definition: "eating, moving, sleeping and washing, taken ahead of everything else",
  parents: ["all-about-alan-topic/self-improvement"],
  related: ["all-about-alan-topic/health-bar", "all-about-alan-topic/how-i-eat"],
  settled:
    "In June 2026 I came out of getting clear about my purpose with one concrete change: health first. Eat, move, sleep, wash.\n\nI need to be able to meet myself from a good place before I can meet others.\n\nThese four are where the clearer purpose acts. They feed the same capacity stack everything else of mine rests on.",
} as const satisfies AllAboutAlanTopic
