import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatSendsMeIntoMachineMode = {
  id: "01a077ec-8a98-7fca-a628-4ba500dcfac5",
  type: "all-about-alan-question",
  slug: "what-sends-me-into-machine-mode",
  topic: "all-about-alan-topic/driving-myself-like-a-machine",
  ask: "What sends me into driving myself like a machine, and do I choose that mode each time or fall into it when nothing else is available?",
} as const satisfies AllAboutAlanQuestion
