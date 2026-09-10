import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const whatMakesMeStartEating = {
  id: "01a06559-9d65-7837-8675-506be4db758e",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "what-makes-me-start-eating",
  title: "What Makes Me Start Eating",
  definition: "the trigger I built to stand in for a hunger signal that does not arrive",
  parents: ["how-i-eat"],
  related: ["the-coloured-circles-i-run-on", "the-repeating-i-do-to-settle"],
  settled:
    "Hunger often does not fire at all, and when it does it is gone in a quarter of an hour whether I eat or not.\n\nThere is no fullness signal at either end, so the whole arc is missing.\n\nThe risk runs one way. I skip meals rather than overeat, which is why the household rule exists.\n\nSo I built a trigger: points and a stoplight I want to move green, then blue.\n\nRanked by what actually starts a meal: stimming first, then food someone brought me, then the points, then rarely hunger.",
} as const satisfies AllAboutAlanTopic
