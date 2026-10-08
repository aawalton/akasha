import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theModesIRunIn = {
  id: "01a06559-9d65-7612-a8d3-24972f06654d",
  type: "page-type/all-about-alan-topic",
  slug: "the-modes-i-run-in",
  title: "The Modes I Run In",
  definition: "the different ways I can run, and what each of them costs to hold",
  parents: ["all-about-alan-topic/how-i-get-anything-done"],
  related: [
    "all-about-alan-topic/how-much-of-me-is-machine",
    "all-about-alan-topic/the-scaffolding-i-built",
  ],
  settled: "Robot mode is one of them: a state I drop into rather than a way of describing me.",
  createdAt: "2026-09-03T03:39:26.949Z",
  updatedAt: "2026-09-15T15:47:51.000Z",
} as const satisfies AllAboutAlanTopic
