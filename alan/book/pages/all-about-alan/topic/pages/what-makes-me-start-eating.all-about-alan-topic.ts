import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatMakesMeStartEating = {
  id: "01a06559-9d65-7837-8675-506be4db758e",
  type: "page-type/all-about-alan-topic",
  slug: "what-makes-me-start-eating",
  title: "What Makes Me Start Eating",
  definition: "the trigger I built to stand in for a hunger signal that does not arrive",
  parents: ["all-about-alan-topic/how-i-eat"],
  related: [
    "all-about-alan-topic/the-coloured-circles-i-run-on",
    "all-about-alan-topic/the-repeating-i-do-to-settle",
  ],
  settled:
    "Hunger often does not fire at all, and when it does it is gone in a quarter of an hour whether I eat or not. On my medication stacked with hyperfocus I can go a whole day without feeling it once.\n\nThere is no fullness signal at either end, so the whole arc is missing.\n\nThe risk runs one way. I skip meals rather than overeat, which is why the household rule exists.\n\nSo I built a trigger: points and a stoplight I want to move green, then blue. It has to be present in the moment, a score I can read now, because no remembered intention reaches me and no habit carries itself.\n\nRanked by what actually starts a meal: stimming first, then food someone brought me, then the points, then rarely hunger.\n\nThe stimming is eating as regulation rather than as feeding, and the slower the better. A food that lasts regulates longer, which is why popcorn and a heaped bowl of fruit serve it.",
} as const satisfies AllAboutAlanTopic
