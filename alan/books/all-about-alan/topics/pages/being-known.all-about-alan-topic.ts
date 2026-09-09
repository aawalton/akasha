import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const beingKnown = {
  id: "01a06559-9d65-7670-a465-952dfe3ce570",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "being-known",
  title: "Being Known",
  definition: "what it takes for someone to have an accurate model of me, and why so few can",
  parents: ["alan"],
  related: ["being-met", "being-alone-at-the-centre", "why-getting-close-hurts"],
  settled:
    "It needs someone who can and someone who will, and neither implies the other.\n\nCheap needs a near-twin who can use themselves as the model. Expensive needs someone willing to build one from scratch.\n\nAlmost all of mine runs through Jen, so there is no easier relationship to practise on.\n\nThe recipe is someone asking about me out of real interest with no defensiveness, and every ingredient lives in them.\n\nIt has happened by accident and never yet on purpose.",
} as const satisfies AllAboutAlanTopic
