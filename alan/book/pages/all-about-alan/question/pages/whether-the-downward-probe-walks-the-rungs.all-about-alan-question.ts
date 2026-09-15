import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherTheDownwardProbeWalksTheRungs = {
  id: "01a077e9-c886-7d7a-9f54-2ee190511146",
  type: "page-type/all-about-alan-question",
  slug: "whether-the-downward-probe-walks-the-rungs",
  topic: "all-about-alan-topic/how-hard-a-thing-is",
  ask: "The downward probe assumes an ordered list of easier things to walk down. Is that list these rungs, or a finer personal ordering I actually step through?",
} as const satisfies AllAboutAlanQuestion
