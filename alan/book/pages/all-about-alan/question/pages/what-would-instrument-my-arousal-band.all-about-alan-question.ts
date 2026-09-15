import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatWouldInstrumentMyArousalBand = {
  id: "01a077e3-2cdb-7e27-ab1a-ba0b00f549f0",
  type: "page-type/all-about-alan-question",
  slug: "what-would-instrument-my-arousal-band",
  topic: "all-about-alan-topic/how-stimulated-i-am",
  ask: "What measured proxy for arousal could I read against being in my band or out of it, since nothing instruments the band today?",
} as const satisfies AllAboutAlanQuestion
