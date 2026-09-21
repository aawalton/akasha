import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatICallTheTwoNights = {
  id: "01a0c600-4618-76c8-a58f-5744061f6204",
  type: "page-type/all-about-alan-topic",
  slug: "what-i-call-the-two-nights",
  title: "What I Call The Two Nights",
  definition: "the canonical names for the two date nights, and the correction that set them",
  parents: ["all-about-alan-topic/the-two-nights-we-keep"],
  settled:
    'The canonical terms are Alan-focused and Jen-focused. The hard one is the Alan-focused night and the beautiful one is the Jen-focused night.\n\nI set those mid-session, correcting my own earlier usage. In my words: "Use Alan-focused instead of me-focused for the canonical term for the date night."\n\nMe-focused is what I called it before that correction, so it survives inside quotations from before then and inside anything already written off those.',
} as const satisfies AllAboutAlanTopic
