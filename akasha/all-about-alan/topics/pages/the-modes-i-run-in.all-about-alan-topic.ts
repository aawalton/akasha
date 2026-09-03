import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const theModesIRunIn = {
  id: "01a06559-9d65-7612-a8d3-24972f06654d",
  pageTypeSlug: "all-about-alan-topic",
  slug: "the-modes-i-run-in",
  title: "The Modes I Run In",
  definition: "the different ways I can run, and what each of them costs to hold",
  parentSlugs: ["how-i-get-anything-done"],
  relatedSlugs: ["how-much-of-me-is-machine", "the-scaffolding-i-built"],
  settled: "Robot mode is one of them: a state I drop into rather than a way of describing me.",
  unsettled:
    "Whether running robot mode saves capacity or costs more than the masking it replaces is unknown, and when I reach for it is unrecorded.\n\nWhether it and the conceptual provision I run in my marriage are one system or two has never been settled.\n\nWhether my resource state decides which mode is even available is unexamined. Low mana pushing me further onto the harness, and low safety degrading my physical responses, are both proposed and untested.",
} as const satisfies AllAboutAlanTopic
