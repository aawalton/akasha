import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const theColoursIReadMyselfIn = {
  id: "01a06559-9d65-7926-8228-eab7219413b2",
  pageTypeSlug: "all-about-alan-topic",
  slug: "the-colours-i-read-myself-in",
  title: "The Colours I Read Myself In",
  definition: "the coarse colour scale I read a resource on before it has numbers",
  parentSlugs: ["how-well-i-can-measure"],
  settled:
    "Green is where I have been living, yellow is caution, red is alarm and black is crisis.",
  unsettled:
    "Is the sigma computed over a long baseline or a rolling recent window? That decides whether the alarm bands hold still while a slide runs, or drift down with it.\n\nStamina's stoplight reads as direction, wanting to move against wanting to be still, where mana's reads as amount. Is that asymmetry real, or does it dissolve once either gets past stoplight?",
} as const satisfies AllAboutAlanTopic
