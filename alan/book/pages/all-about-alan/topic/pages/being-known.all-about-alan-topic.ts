import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const beingKnown = {
  id: "01a06559-9d65-7670-a465-952dfe3ce570",
  type: "page-type/all-about-alan-topic",
  slug: "being-known",
  title: "Being Known",
  definition: "what it takes for someone to have an accurate model of me, and why so few can",
  parents: ["all-about-alan-topic/alan"],
  related: [
    "all-about-alan-topic/being-met",
    "all-about-alan-topic/being-alone-at-the-centre",
    "all-about-alan-topic/why-getting-close-hurts",
  ],
  settled:
    "It needs someone who can and someone who will, and neither implies the other.\n\nCheap needs a near-twin who can use themselves as the model. Expensive needs someone willing to build one from scratch.\n\nAlmost all of mine runs through Jen, so there is no easier relationship to practise on. After twenty years of isolation she is the only adult with real stake in me, something over eighty percent of my close connection across eighteen years of marriage.\n\nSo there is no graded ladder, no low-stakes warm-up. Every attempt is the hardest lift, cold, every time.\n\nThe recipe is someone asking about me out of real interest with no defensiveness, and every ingredient lives in them.\n\nIt has happened by accident and never yet on purpose.",
} as const satisfies AllAboutAlanTopic
